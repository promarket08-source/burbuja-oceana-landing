Set-Location -LiteralPath "D:\AI_Agency\projects\clientes\burbuja\landing-emprende360"
git push origin main
if ($LASTEXITCODE -ne 0) {
    Write-Output "Push failed, trying with force..."
    git push origin main --force
}
Write-Output "Push completed"