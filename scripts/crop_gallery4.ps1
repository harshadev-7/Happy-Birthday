Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\harsh\.gemini\antigravity\brain\ad6e10f5-c6c1-4452-9604-cfbea7513f08\.user_uploaded\media_1795496868926_3fb28117.jpg"
$dstPath = "d:\Documents\Happy birthday\Bday2\public\images\gallery4.jpg"

$src = [System.Drawing.Image]::FromFile($srcPath)
Write-Output "Original size: $($src.Width) x $($src.Height)"

# The original is 1024x613. The boy is on the left (X: 0 to 240) and the girl is running ahead (X: 420 to 600).
# From X=613 to 1024 is empty sea and sand.
# We crop a 613x613 square from X=0, capturing both the boy and girl completely.
$cropX = 0
$cropY = 0
$cropWidth = 613
$cropHeight = 613

$bmp = New-Object System.Drawing.Bitmap($cropWidth, $cropHeight)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

$srcRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropWidth, $cropHeight)
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

Write-Output "Cropped gallery4.jpg saved successfully! New size: $cropWidth x $cropHeight"
