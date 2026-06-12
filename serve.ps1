# Lightweight PowerShell HTTP Server for SPA (Single Page Applications)
# Serves static files and redirects non-file routes to index.html to prevent 404s.

$port = 8080
$prefix = "http://localhost:$port/"
$localDir = Get-Item .

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()

Write-Host "DataQuest Academy server is running at $prefix"
Write-Host "Press Ctrl+C to stop the server."

try {
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $urlPath = $request.Url.LocalPath
        if ($urlPath -eq "/") {
            $urlPath = "/index.html"
        }
        
        # Map to physical file path
        $cleanPath = $urlPath.Replace('/', [System.IO.Path]::DirectorySeparatorChar).TrimStart([System.IO.Path]::DirectorySeparatorChar)
        $filePath = Join-Path $localDir.FullName $cleanPath
        
        # SPA Fallback: If file doesn't exist, serve index.html
        if (-not (Test-Path $filePath -PathType Leaf)) {
            $filePath = Join-Path $localDir.FullName "index.html"
        }
        
        if (Test-Path $filePath -PathType Leaf) {
            $bytes = [System.IO.File]::ReadAllBytes($filePath)
            
            # Set content-type header
            if ($filePath -match '\.html$') {
                $response.ContentType = "text/html; charset=utf-8"
            } elseif ($filePath -match '\.css$') {
                $response.ContentType = "text/css; charset=utf-8"
            } elseif ($filePath -match '\.js$') {
                $response.ContentType = "application/javascript; charset=utf-8"
            } elseif ($filePath -match '\.json$') {
                $response.ContentType = "application/json; charset=utf-8"
            } elseif ($filePath -match '\.png$') {
                $response.ContentType = "image/png"
            } elseif ($filePath -match '\.svg$') {
                $response.ContentType = "image/svg+xml"
            }
            
            $response.ContentLength64 = $bytes.Length
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
        } else {
            # Absolute fallback
            $response.StatusCode = 404
            $errBytes = [System.Text.Encoding]::UTF8.GetBytes("File not found")
            $response.OutputStream.Write($errBytes, 0, $errBytes.Length)
        }
        
        $response.Close()
    }
} catch {
    Write-Host "Stopping server..."
} finally {
    $listener.Stop()
}
