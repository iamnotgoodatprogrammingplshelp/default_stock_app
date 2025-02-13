import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta
import time

def get_gold_data(interval='1h'):
    """
    Fetch gold price data using GLD ETF as a proxy.
    
    Parameters:
    interval (str): '1h' for hourly data or '1m' for minute-by-minute data
    
    Returns:
    pandas.DataFrame: Gold price data
    """
    try:
        # GLD ETF is used as a proxy for gold prices
        gold = yf.Ticker("GLD")
        
        if interval == '1h':
            # Last 24 hours of data
            end_time = datetime.now()
            start_time = end_time - timedelta(days=1)
            df = gold.history(start=start_time, end=end_time, interval='1h')
        else:
            # Last hour of data
            end_time = datetime.now()
            start_time = end_time - timedelta(hours=1)
            df = gold.history(start=start_time, end=end_time, interval='1m')
        
        return df
    
    except Exception as e:
        print(f"Error fetching gold data: {str(e)}")
        return None

def format_price_data(df):
    """
    Format the price data for display.
    """
    if df is None or df.empty:
        return "No data available"
    
    formatted_data = []
    for index, row in df.iterrows():
        formatted_data.append(f"Time: {index.strftime('%Y-%m-%d %H:%M')} | Price: ${row['Close']:.2f}")
    
    return "\n".join(formatted_data)

def timer(duration):
    """
    Display a countdown timer.
    
    Parameters:
    duration (int): Duration in seconds
    """
    for remaining in range(duration, 0, -1):
        print(f"\rTime remaining: {remaining:2d} seconds", end="")
        time.sleep(1)
    print("\rTimer completed!            ")

def main():
    while True:
        print("\nGold Price Tracker")
        print("1. View last 24 hours of gold prices")
        print("2. View this hour's gold prices")
        print("3. Set a timer")
        print("4. Exit")
        
        choice = input("\nEnter your choice (1-4): ")
        
        if choice == '1':
            print("\nFetching 24-hour gold price data...")
            df = get_gold_data(interval='1h')
            print("\nLast 24 Hours Gold Prices:")
            print(format_price_data(df))
            
        elif choice == '2':
            print("\nFetching hourly gold price data...")
            df = get_gold_data(interval='1m')
            print("\nThis Hour's Gold Prices:")
            print(format_price_data(df))
            
        elif choice == '3':
            try:
                duration = int(input("\nEnter timer duration in seconds: "))
                if duration > 0:
                    timer(duration)
                else:
                    print("Please enter a positive number.")
            except ValueError:
                print("Please enter a valid number.")
                
        elif choice == '4':
            print("\nExiting program...")
            break
            
        else:
            print("\nInvalid choice. Please try again.")
        
        input("\nPress Enter to continue...")

if __name__ == "__main__":
    main()