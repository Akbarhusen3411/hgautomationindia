Set-Location 'E:\Company_Web\hg_automation_web\wordpress-theme'

# Remove all old zips
Remove-Item '*.zip' -Force -ErrorAction SilentlyContinue

# Method 1: Files at ROOT level (no folder)
Compress-Archive -Path 'hg-automation\*' -DestinationPath 'hg-automation-v1.zip' -Force
Write-Host "Created: hg-automation-v1.zip (files at root)"

# Method 2: With folder wrapper
Compress-Archive -Path 'hg-automation' -DestinationPath 'hg-automation-v2.zip' -Force
Write-Host "Created: hg-automation-v2.zip (with folder)"

# Show both structures
Add-Type -AssemblyName System.IO.Compression.FileSystem

Write-Host "`n=== hg-automation-v1.zip (TRY THIS FIRST) ==="
$zip1 = [IO.Compression.ZipFile]::OpenRead('E:\Company_Web\hg_automation_web\wordpress-theme\hg-automation-v1.zip')
$zip1.Entries | Where-Object { $_.Name -ne '' } | Select-Object -First 6 FullName
$zip1.Dispose()

Write-Host "`n=== hg-automation-v2.zip ==="
$zip2 = [IO.Compression.ZipFile]::OpenRead('E:\Company_Web\hg_automation_web\wordpress-theme\hg-automation-v2.zip')
$zip2.Entries | Where-Object { $_.Name -ne '' } | Select-Object -First 6 FullName
$zip2.Dispose()

Write-Host "`nBoth files created in: E:\Company_Web\hg_automation_web\wordpress-theme\"
