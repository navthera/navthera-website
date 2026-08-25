param([int]$Port = 3000)

$Root = (Resolve-Path $PSScriptRoot).Path
$Prefix = "http://127.0.0.1:$Port/"
$Routes = @{
    '/' = 'index.html'
    '/about' = 'about.html'
    '/services' = 'services.html'
    '/aquatherapy' = 'aquatherapy.html'
    '/aquafit' = 'aquafit.html'
    '/contact' = 'contact.html'
    '/neuro-rehabilitation' = 'neuro-rehab.html'
    '/orthopaedic-rehabilitation' = 'orthopaedic.html'
    '/sports-rehabilitation' = 'sports-rehab.html'
    '/pelvic-health-physiotherapy' = 'pelvic-health.html'
    '/geriatric-physiotherapy' = 'geriatric.html'
    '/oncology-rehabilitation' = 'oncology.html'
    '/balance-and-vestibular-rehabilitation' = 'balance-vestibular.html'
    '/cardio-respiratory-rehabilitation' = 'cardio-respiratory-rehabilitation/index.html'
    '/womens-health-physiotherapy' = 'womens-health.html'
    '/blog/' = 'blog/index.html'
}
$MimeTypes = @{
    '.html' = 'text/html; charset=utf-8'; '.css' = 'text/css; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'
    '.json' = 'application/json; charset=utf-8'; '.xml' = 'application/xml; charset=utf-8'; '.txt' = 'text/plain; charset=utf-8'
    '.png' = 'image/png'; '.jpg' = 'image/jpeg'; '.jpeg' = 'image/jpeg'; '.webp' = 'image/webp'; '.svg' = 'image/svg+xml'; '.ico' = 'image/x-icon'
}

function Get-LocalPath([string]$RequestPath) {
    $decoded = [Uri]::UnescapeDataString($RequestPath.Split('?')[0])
    if ($decoded.Length -gt 1 -and $decoded -ne '/blog/') { $decoded = $decoded.TrimEnd('/') }
    if ($decoded -eq '') { $decoded = '/' }
    if ($Routes.ContainsKey($decoded)) { $relative = $Routes[$decoded] }
    elseif ($decoded.StartsWith('/blog/') -and $decoded -ne '/blog/') { $relative = ($decoded.TrimStart('/') + '.html') }
    else { $relative = $decoded.TrimStart('/') }
    $candidate = [IO.Path]::GetFullPath((Join-Path $Root $relative))
    $rootWithSeparator = $Root.TrimEnd('\') + '\'
    if ($candidate -ne $Root -and -not $candidate.StartsWith($rootWithSeparator, [StringComparison]::OrdinalIgnoreCase)) { return $null }
    return $candidate
}

$listener = [Net.HttpListener]::new()
$listener.Prefixes.Add($Prefix)
$listener.Start()
Write-Host "Navthera development server: $Prefix"
Write-Host "Serving only: $Root"
try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $requestPath = $context.Request.Url.AbsolutePath
        if ($requestPath.Length -gt 1 -and $requestPath.EndsWith('/') -and $requestPath -ne '/blog/') {
            $context.Response.StatusCode = 301
            $context.Response.RedirectLocation = $requestPath.TrimEnd('/')
            $context.Response.Close()
            continue
        }
        $path = Get-LocalPath $context.Request.Url.PathAndQuery
        if ($null -eq $path -or -not (Test-Path -LiteralPath $path -PathType Leaf)) {
            $context.Response.StatusCode = 404
            $body = [Text.Encoding]::UTF8.GetBytes('Not Found')
        } else {
            $body = [IO.File]::ReadAllBytes($path)
            $extension = [IO.Path]::GetExtension($path).ToLowerInvariant()
            if ($MimeTypes.ContainsKey($extension)) { $context.Response.ContentType = $MimeTypes[$extension] }
            $context.Response.StatusCode = 200
        }
        $context.Response.ContentLength64 = $body.Length
        $context.Response.OutputStream.Write($body, 0, $body.Length)
        $context.Response.Close()
    }
} finally {
    $listener.Stop()
    $listener.Close()
}