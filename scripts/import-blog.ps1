<#
  Importa los artículos del blog desde Recursos/blog_mongohacker.xlsx
  y genera src/data/blog-posts.json (solo los marcados como publicados).

  Uso:  pwsh ./scripts/import-blog.ps1   (o)   powershell -File scripts/import-blog.ps1

  No requiere dependencias de npm: lee el .xlsx (que es un .zip) directamente.
  Vuelve a ejecutarlo cada vez que actualices el Excel.
#>

$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$xlsx = Join-Path $root 'Recursos/blog_mongohacker.xlsx'
$outJson = Join-Path $root 'src/data/blog-posts.json'

if (-not (Test-Path $xlsx)) { throw "No se encuentra el Excel: $xlsx" }

# --- Descomprimir el xlsx en una carpeta temporal ---
$tmp = Join-Path $env:TEMP ("blogimport_" + [Guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory $tmp | Out-Null
try {
  $zip = Join-Path $tmp 'book.zip'
  Copy-Item $xlsx $zip
  Expand-Archive $zip (Join-Path $tmp 'x') -Force
  $xl = Join-Path $tmp 'x/xl'

  # --- Shared strings ---
  $ss = [xml](Get-Content (Join-Path $xl 'sharedStrings.xml') -Raw -Encoding UTF8)
  $strings = @()
  foreach ($si in $ss.sst.si) {
    $strings += , (($si.SelectNodes('.//*[local-name()="t"]') | ForEach-Object { $_.InnerText }) -join '')
  }

  # --- Hoja 1 ---
  $sheet = [xml](Get-Content (Join-Path $xl 'worksheets/sheet1.xml') -Raw -Encoding UTF8)
  $rows = $sheet.SelectNodes('//*[local-name()="row"]')

  $colKeys = 'A','B','C','D','E','F','G','H','I','J','K'
  $header = $null
  $records = New-Object System.Collections.ArrayList

  foreach ($row in $rows) {
    $cells = @{}
    foreach ($c in $row.SelectNodes('.//*[local-name()="c"]')) {
      $ref = $c.getAttribute('r'); $col = ($ref -replace '\d','')
      $t = $c.getAttribute('t')
      $vNode = $c.SelectSingleNode('.//*[local-name()="v"]')
      $isNode = $c.SelectSingleNode('.//*[local-name()="t"]')
      $val = ''
      if ($vNode) { $val = $vNode.InnerText } elseif ($isNode) { $val = $isNode.InnerText }
      if ($t -eq 's' -and $val -ne '') { $val = $strings[[int]$val] }
      $cells[$col] = $val
    }
    if (-not $header) { $header = $cells; continue }
    if ($cells['B']) { [void]$records.Add($cells) }
  }

  # --- Mapeo de categorías del Excel a los IDs del sitio ---
  $catMap = @{
    'IA' = 'ai'; 'Inteligencia Artificial' = 'ai';
    'Ciberseguridad' = 'cyber'; 'Seguridad' = 'cyber';
    'DevOps' = 'dev'; 'Programación' = 'dev'; 'Tecnología' = 'dev'; 'Desarrollo' = 'dev';
    'Productividad' = 'productivity';
  }

  $posts = New-Object System.Collections.ArrayList
  foreach ($r in $records) {
    if ($r['I'] -notmatch 'VERDADERO|TRUE|true|1') { continue }  # solo publicados

    $catOrig = ($r['F']).Trim()
    $catId = if ($catMap.ContainsKey($catOrig)) { $catMap[$catOrig] } else { 'dev' }

    # Fecha: serial de Excel -> ISO yyyy-MM-dd
    $dateIso = ''
    if ($r['G'] -match '^\d+(\.\d+)?$') {
      $dateIso = [DateTime]::FromOADate([double]$r['G']).ToString('yyyy-MM-dd')
    }

    # Tiempo de lectura: "4 min" -> 4
    $minRead = 5
    if ($r['K'] -match '(\d+)') { $minRead = [int]$Matches[1] }

    # Normalización: si el contenido tiene un bloque de código ``` sin cerrar
    # (p. ej. por una celda truncada en el Excel), lo cerramos para que el
    # render de Markdown no se rompa.
    $content = $r['E']
    $fenceCount = ([regex]::Matches($content, '```')).Count
    if ($fenceCount % 2 -ne 0) { $content = $content.TrimEnd() + "`n" + '```' }

    $post = [ordered]@{
      id              = [int][double]$r['A']
      title           = ($r['B']).Trim()
      slug            = ($r['C']).Trim()
      excerpt         = ($r['D']).Trim()
      content         = $content
      category        = $catId
      categoryOriginal = $catOrig
      tags            = @($catOrig.ToLower())
      date            = $dateIso
      metaDescription = ($r['H']).Trim()
      minRead         = $minRead
    }
    [void]$posts.Add($post)
  }

  # Orden por fecha descendente
  $sorted = $posts | Sort-Object { $_.date } -Descending

  $json = ConvertTo-Json @($sorted) -Depth 6
  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($outJson, $json, $utf8NoBom)

  Write-Output "OK: $($posts.Count) artículos publicados -> $outJson"
}
finally {
  Remove-Item $tmp -Recurse -Force -ErrorAction SilentlyContinue
}
