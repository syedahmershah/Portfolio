from PIL import Image
import os

def resize_icon(input_path, output_path, size, add_padding=False):
    # Create the output directory if it doesn't exist
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    
    # Open and resize the image
    with Image.open(input_path) as img:
        if add_padding:
            # Calculate padding for maskable icons (ensure safe area)
            safe_area_ratio = 0.8  # 80% of the image size for safe area
            new_size = int(size / safe_area_ratio)
            padding = (new_size - size) // 2
            
            # Create new image with padding
            new_img = Image.new('RGBA', (new_size, new_size), (0, 0, 0, 0))
            resized = img.resize((size, size), Image.Resampling.LANCZOS)
            new_img.paste(resized, (padding, padding))
            
            # Resize back to target size
            new_img = new_img.resize((size, size), Image.Resampling.LANCZOS)
            new_img.save(output_path, 'PNG')
        else:
            # Simple resize for regular icons
            img.resize((size, size), Image.Resampling.LANCZOS).save(output_path, 'PNG')

def main():
    input_path = 'Images/Favicon/Favicon.png'
    
    # Generate regular icons
    resize_icon(input_path, 'Images/Favicon/Favicon-192.png', 192)
    resize_icon(input_path, 'Images/Favicon/Favicon-512.png', 512)
    
    # Generate maskable icons with padding
    resize_icon(input_path, 'Images/Favicon/Favicon-maskable-192.png', 192, True)
    resize_icon(input_path, 'Images/Favicon/Favicon-maskable-512.png', 512, True)
    
    print("Icons generated successfully!")

if __name__ == '__main__':
    main() 