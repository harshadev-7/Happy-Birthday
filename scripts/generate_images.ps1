Add-Type -AssemblyName System.Drawing

$imgDir = "d:\Documents\Happy birthday\Bday2\public\images"
if (!(Test-Path $imgDir)) { New-Item -ItemType Directory -Path $imgDir -Force }

function Create-ArtImage($path, $w, $h, $title, $subtitle, $color1, $color2, $icon) {
    $bmp = New-Object System.Drawing.Bitmap($w, $h)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::AntiAlias

    $rect = New-Object System.Drawing.Rectangle(0, 0, $w, $h)
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, [System.Drawing.ColorTranslator]::FromHtml($color1), [System.Drawing.ColorTranslator]::FromHtml($color2), 45.0)
    $g.FillRectangle($brush, $rect)

    # Ambient bokeh circles
    $rand = New-Object System.Random
    for ($i=0; $i -lt 18; $i++) {
        $rw = $rand.Next(40, 160)
        $rx = $rand.Next(-20, $w)
        $ry = $rand.Next(-20, $h)
        $alpha = $rand.Next(20, 70)
        $bBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb($alpha, 255, 255, 255))
        $g.FillEllipse($bBrush, $rx, $ry, $rw, $rw)
        $bBrush.Dispose()
    }

    $fontIcon = New-Object System.Drawing.Font("Segoe UI Emoji", [int]($h * 0.16), [System.Drawing.FontStyle]::Regular)
    $fontTitle = New-Object System.Drawing.Font("Georgia", [int]($h * 0.052), [System.Drawing.FontStyle]::Bold)
    $fontSub = New-Object System.Drawing.Font("Georgia", [int]($h * 0.038), [System.Drawing.FontStyle]::Italic)

    $format = New-Object System.Drawing.StringFormat
    $format.Alignment = [System.Drawing.StringAlignment]::Center
    $format.LineAlignment = [System.Drawing.StringAlignment]::Center

    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $goldBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(240, 255, 220, 180))

    $g.DrawString($icon, $fontIcon, $whiteBrush, ($w/2), ($h*0.38), $format)
    $g.DrawString($title, $fontTitle, $whiteBrush, ($w/2), ($h*0.68), $format)
    $g.DrawString($subtitle, $fontSub, $goldBrush, ($w/2), ($h*0.78), $format)

    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $g.Dispose()
    $bmp.Dispose()
}

Create-ArtImage (Join-Path $imgDir "memory1.jpg") 600 600 "First Little Memory" "Where it all began" "#780206" "#061161" "🧸"
Create-ArtImage (Join-Path $imgDir "memory2.jpg") 600 600 "Soft Memory" "Wrapped in gentle love" "#e65c00" "#F9D423" "🎀"
Create-ArtImage (Join-Path $imgDir "memory3.jpg") 600 600 "Cute & Cozy" "Forever mine" "#cc2b5e" "#753a88" "💞"
Create-ArtImage (Join-Path $imgDir "memory4.jpg") 600 600 "Favourite Person" "Warmest moments" "#2c3e50" "#fd746c" "✨"
Create-ArtImage (Join-Path $imgDir "memory5.jpg") 600 600 "In Full Bloom" "A sweet blossom" "#d31027" "#ea384d" "🌷"

Create-ArtImage (Join-Path $imgDir "gallery1.jpg") 700 700 "A Treasure Memory" "Every second with you" "#8A2387" "#E94057" "🌸"
Create-ArtImage (Join-Path $imgDir "gallery2.jpg") 700 700 "More Beautiful World" "Because you are in it" "#f857a6" "#ff5858" "✨"
Create-ArtImage (Join-Path $imgDir "gallery3.jpg") 700 700 "Happy Birthday" "To my favourite person" "#4A1521" "#D81E57" "❤️"
Create-ArtImage (Join-Path $imgDir "gallery4.jpg") 700 700 "Chasing Sunsets" "Golden hour dreams" "#f12711" "#f5af19" "🌅"
Create-ArtImage (Join-Path $imgDir "gallery5.jpg") 700 700 "Radiant Smiles" "Unfiltered happiness" "#654ea3" "#eaafc8" "🧸"

Create-ArtImage (Join-Path $imgDir "cover1.jpg") 400 400 "Nee Choopule" "GV Prakash Kumar" "#4a1521" "#1a0b12" "🎵"
Create-ArtImage (Join-Path $imgDir "cover2.jpg") 400 400 "Perfect" "Ed Sheeran" "#2b1055" "#7597de" "🎶"
Create-ArtImage (Join-Path $imgDir "cover3.jpg") 400 400 "I Wanna Be Yours" "Arctic Monkeys" "#141E30" "#243B55" "🎧"
Create-ArtImage (Join-Path $imgDir "cover4.jpg") 400 400 "Under The Influence" "Chris Brown" "#3f2b96" "#e8c" "📀"

Write-Output "Art images generated successfully!"
