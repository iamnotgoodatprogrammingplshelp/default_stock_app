import http.server
import json
import urllib.request
from datetime import datetime
import socketserver

class ForexHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/forex':
            # Using Alpha Vantage's free API (you'll need to replace with your API key)
            # Note: In production, never expose API keys in code
            api_key = 'demo'
            symbol = 'EUR/USD'
            url = f'https://www.google.com/finance/quote/HTLF:NASDAQ={api_key}'
            
            try:
                with urllib.request.urlopen(url) as response:
                    data = json.loads(response.read())
                    
                # Process the data
                time_series = data.get('Time Series FX (5min)', {})
                processed_data = []
                
                for timestamp, values in list(time_series.items())[:48]:  # Last 48 data points
                    processed_data.append({
                        'time': datetime.strptime(timestamp, '%Y-%m-%d %H:%M:%S').strftime('%H:%M'),
                        'price': float(values['1. open']),
                        'ma20': 0,  # You would calculate this properly with more data
                        'ma50': 0   # You would calculate this properly with more data
                    })
                
                # Send response
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps(processed_data).encode())
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
        else:
            super().do_GET()

PORT = 8000
Handler = ForexHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at port {PORT}")
    httpd.serve_forever()
