from pydantic import BaseModel
from typing import Dict, Union

class ReceiptItems(BaseModel):
    items: Dict[str, Union[float, int]]  # Dict of item name to price 