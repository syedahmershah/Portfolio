from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from PIL import Image
import time
import os

def take_screenshot(url, output_path, width, height, mobile=False):
    chrome_options = Options()
    chrome_options.add_argument('--headless')  # Run in headless mode
    chrome_options.add_argument('--no-sandbox')
    chrome_options.add_argument('--disable-dev-shm-usage')
    
    if mobile:
        mobile_emulation = {
            "deviceMetrics": { "width": width, "height": height, "pixelRatio": 3.0 },
            "userAgent": "Mozilla/5.0 (Linux; Android 11; Pixel 5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.91 Mobile Safari/537.36"
        }
        chrome_options.add_experimental_option("mobileEmulation", mobile_emulation)
    
    driver = webdriver.Chrome(options=chrome_options)
    
    if not mobile:
        # Set a slightly larger viewport to account for any scaling issues
        driver.set_window_size(width + 100, height + 100)
    
    try:
        driver.get(url)
        # Wait for page to load
        time.sleep(5)
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(output_path), exist_ok=True)
        
        # Take screenshot
        temp_screenshot = "temp_screenshot.png"
        driver.save_screenshot(temp_screenshot)
        
        # Use PIL to resize to exact dimensions
        with Image.open(temp_screenshot) as img:
            # Resize to exact dimensions
            img_resized = img.resize((width, height), Image.Resampling.LANCZOS)
            img_resized.save(output_path, 'PNG', quality=100)
        
        # Clean up temporary file
        os.remove(temp_screenshot)
        print(f"Screenshot saved to {output_path} with dimensions {width}x{height}")
    finally:
        driver.quit()

def main():
    url = "http://localhost:8000"
    
    # Take desktop screenshot (1920x1080)
    take_screenshot(url, "Images/Screenshots/desktop.png", 1920, 1080)
    
    # Take mobile screenshot (1080x1920)
    take_screenshot(url, "Images/Screenshots/mobile.png", 1080, 1920, mobile=True)

if __name__ == "__main__":
    main() 