Set-Location "d:\Documents\Happy birthday\Bday2"

$proc = Start-Process node -ArgumentList "server/server.js" -PassThru -NoNewWindow
Start-Sleep -Seconds 2

try {
    Write-Output "Testing GET / ..."
    $resRoot = Invoke-WebRequest -Uri "http://localhost:3000/" -UseBasicParsing
    Write-Output "Root status: $($resRoot.StatusCode), Length: $($resRoot.Content.Length)"

    Write-Output "Testing GET /api/config ..."
    $resConfig = Invoke-RestMethod -Uri "http://localhost:3000/api/config" -Method Get
    Write-Output "Config success: $($resConfig.success), Recipient: $($resConfig.config.recipient_name)"

    Write-Output "Testing POST /api/verify-code with correct code ..."
    $verifyBody = @{ code = "120800" } | ConvertTo-Json
    $resVerify = Invoke-RestMethod -Uri "http://localhost:3000/api/verify-code" -Method Post -Body $verifyBody -ContentType "application/json"
    Write-Output "Verify correct code: $($resVerify.success)"

    Write-Output "Testing POST /api/verify-code with wrong code ..."
    $wrongBody = @{ code = "999999" } | ConvertTo-Json
    $resWrong = Invoke-RestMethod -Uri "http://localhost:3000/api/verify-code" -Method Post -Body $wrongBody -ContentType "application/json"
    Write-Output "Verify wrong code: $($resWrong.success)"

    Write-Output "Testing GET /api/wishes ..."
    $resWishes = Invoke-RestMethod -Uri "http://localhost:3000/api/wishes" -Method Get
    Write-Output "Wishes count: $($resWishes.wishes.Count)"

    Write-Output "Testing POST /api/wishes ..."
    $newWishBody = @{ name = "Tester"; message = "Happy birthday from automated test! ✨"; emoji = "🎉"; tag = "Friend" } | ConvertTo-Json
    $resNewWish = Invoke-RestMethod -Uri "http://localhost:3000/api/wishes" -Method Post -Body $newWishBody -ContentType "application/json"
    Write-Output "New wish created: $($resNewWish.wish.id) - $($resNewWish.wish.name)"

    Write-Output "Testing GET /api/stats ..."
    $resStats = Invoke-RestMethod -Uri "http://localhost:3000/api/stats" -Method Get
    Write-Output "Stats: $($resStats.stats | ConvertTo-Json -Compress)"

    Write-Output "Testing GET /admin ..."
    $resAdmin = Invoke-WebRequest -Uri "http://localhost:3000/admin" -UseBasicParsing
    Write-Output "Admin status: $($resAdmin.StatusCode)"
}
finally {
    Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
    Write-Output "Server process terminated cleanly."
}
