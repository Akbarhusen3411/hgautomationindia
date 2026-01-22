Set-Location 'E:\Company_Web\hg_automation_web\wordpress-theme'
Remove-Item '*.zip' -Force -ErrorAction SilentlyContinue

# Create zip with folder included
Compress-Archive -Path 'hg-automation' -DestinationPath 'hg-automation.zip' -Force

Write-Host "Created: hg-automation.zip"
Write-Host "Size:" (Get-Item 'hg-automation.zip').Length "bytes"

# Show structure
Add-Type -AssemblyName System.IO.Compression.FileSystem
$zip = [IO.Compression.ZipFile]::OpenRead('E:\Company_Web\hg_automation_web\wordpress-theme\hg-automation.zip')
Write-Host "`nZip contents:"
$zip.Entries | Select-Object -First 8 FullName | Format-Table -AutoSize
$zip.Dispose()
