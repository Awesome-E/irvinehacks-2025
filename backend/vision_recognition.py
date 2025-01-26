import os
from openai import OpenAI
import base64
from dotenv import load_dotenv
import json
from models import ReceiptItems

load_dotenv()  # Load environment variables from .env file

client = OpenAI(api_key=os.getenv('OPENAI_API_KEY'))

def encode_image_to_base64(image_path):
    """Convert image to base64 string"""
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def extract_text_with_gpt(image_path):
    """Extract text from image using GPT-4 Vision"""
    try:
        # Convert image to base64
        base64_image = encode_image_to_base64(image_path)

        # Prepare the message for GPT-4 Vision
        response = client.beta.chat.completions.parse(
            model="gpt-4o-mini",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": "This is a receipt. Extract all items and their prices. Return ONLY a JSON object where keys are item names and values are numeric prices. For example: {'apple': 1.99, 'banana': 0.99}"
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:image/jpeg;base64,{base64_image}"
                            }
                        }
                    ]
                }
            ],
            max_tokens=1000,
            response_format={"type": "json_object"}
        )
        
        gpt_response = response.choices[0].message.content
        return gpt_response

    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return None

# Example usage
if __name__ == "__main__":
    # Test the function with a sample image
    sample_image_path = "path/to/your/receipt.jpg"
    result = extract_text_with_gpt(sample_image_path)
    print(result) 