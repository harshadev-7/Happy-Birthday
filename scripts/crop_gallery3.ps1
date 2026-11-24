Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\harsh\.gemini\antigravity\brain\ad6e10f5-c6c1-4452-9604-cfbea7513f08\.user_uploaded\media_1795496649386_63b9cd79.jpg"
$dstPath = "d:\Documents\Happy birthday\Bday2\public\images\gallery3.jpg"

$src = [System.Drawing.Image]::FromFile($srcPath)
Write-Output "Original size: $($src.Width) x $($src.Height)"

# Crop with generous headroom: Y=60 to Y=860 (height=800, width=768)
$cropY = 60
$cropHeight = 800
$cropWidth = $src.Width

$bmp = New-Object System.Drawing.Bitmap($cropWidth, $cropHeight)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$srcRect = New-Object System.Drawing.Rectangle(0, $cropY, $cropWidth, $cropHeight)
$dstRect = New-Object System.Drawing.Rectangle(0, 0, $cropWidth, $cropHeight)

$g.DrawImage($src, $dstRect, $srcRect, [System.Drawing.GraphicsUnit]::Pixel)

$src.Dispose()
$g.Dispose()

$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)

$bmp.Save($dstPath, $codec, $encoderParams)
$bmp.Dispose()
$encoderParams.Dispose()

Write-Output "Cropped gallery3.jpg successfully saved!"
