Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\harsh\.gemini\antigravity\brain\ad6e10f5-c6c1-4452-9604-cfbea7513f08\.user_uploaded\media_1795496231303_94520d3a.jpg"
$dstPath = "d:\Documents\Happy birthday\Bday2\public\images\gallery1.jpg"

$src = [System.Drawing.Image]::FromFile($srcPath)
Write-Output "Original size: $($src.Width) x $($src.Height)"

# In the original image:
# Total height: 1024, width: 458
# Her head starts around Y=190, hand at Y=220, face down to Y=320, waist at Y=460.
# If we start crop at Y=130 with height=500, we get headroom above hair, her full head, face, hand, and dress!
$cropY = 130
$cropHeight = 500
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

# Save with high JPEG quality (95)
$codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
$encoderParams = New-Object System.Drawing.Imaging.EncoderParameters(1)
$encoderParams.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter([System.Drawing.Imaging.Encoder]::Quality, [long]95)

$bmp.Save($dstPath, $codec, $encoderParams)
$bmp.Dispose()
$encoderParams.Dispose()

Write-Output "Cropped gallery1.jpg successfully saved!"
