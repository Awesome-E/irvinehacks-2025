import os
from openai import OpenAI
import base64
from dotenv import load_dotenv
import json
from models import ReceiptItems

load_dotenv()  # Load environment variables from .env file

EXAMPLE_OUTPUT = {
    'apple': { 'inferred': 'Apple','quantity': 6, 'color': '#d74521', 'tip': 'Store in the fridge and wrap them in a paper towel' },
    'BC NF Van Grk Ygrt': { 'inferred': 'Greek Yogurt', 'quantity': 3, 'color': '#abbc33', 'tip': 'store it in the coldest part of your refrigerator, in an airtight container' }
}

PROMPTS = {
    'quantity': "This is a receipt. Extract all items and their prices. Return ONLY a JSON object where keys are item names and values are their numeric quantity. Please list food names with best accuracy. If there is no quantity listed, set it to 1. For example: {'apple': 6, 'grapes': 1, 'banana': 3}",
    'quantity_with_duplicate': "This is a receipt. Extract all items and their quantities. Return ONLY a JSON object where keys are item names and values are their numeric quantity. Please list food names with best accuracy. If there is no quantity listed, set it to the number of times that item appears. For example: {'apple': 6, 'grapes': 1, 'banana': 3}",
    'inference': f"This is a receipt. Extract every item, what produce item you infer, and the quantity. Return ONLY a JSON object, where keys are the item names as seen on the receipt, and values are dictionaries of their inferred produce item, their quantity, a saturated hex color that both represents it and can provide adequate contrast to white text, and a short sentence on how to make it last longer. List food names with best accuracy. If there is no quantity listed, set it to the number of times that item appears. For Example: {EXAMPLE_OUTPUT}"
}

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
                            "text": PROMPTS['inference']
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