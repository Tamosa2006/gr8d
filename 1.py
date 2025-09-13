from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn
import numpy as np

app = FastAPI(title="AI Sorting Hat")


class UserInput(BaseModel):
    answers: list[int]   
    text: str            


house_traits = {
    "Gryffindor": np.array([0.7, 0.3, 0.9, 0.2, 0.5]), 
    "Ravenclaw":  np.array([0.2, 0.3, 0.3, 0.9, 0.9]),
    "Hufflepuff": np.array([0.4, 0.9, 0.2, 0.4, 0.3]),
    "Slytherin":  np.array([0.3, 0.2, 0.9, 0.3, 0.4])
}

# ---------- Simple scoring ----------
def score_user(answers, text):
    # Map quiz answers to traits (toy example: 5 traits)
    traits = np.zeros(5)
    if len(answers) >= 5:
        traits = np.array(answers[:5]) / 5.0  # n

    # Tiny text bonus: add courage if "brave" appears, ambition if "power" appears, etc.
    text_lower = text.lower()
    if "brave" in text_lower: traits[0] += 0.2
    if "loyal" in text_lower: traits[1] += 0.2
    if "power" in text_lower: traits[2] += 0.2
    if "learn" in text_lower: traits[3] += 0.2
    if "create" in text_lower: traits[4] += 0.2

    # Compare traits with house prototypes (cosine similarity)
    scores = {}
    for house, proto in house_traits.items():
        sim = np.dot(traits, proto) / (np.linalg.norm(traits) * np.linalg.norm(proto) + 1e-9)
        scores[house] = sim

    # Softmax to probabilities
    exp_scores = np.exp(list(scores.values()))
    probs = exp_scores / np.sum(exp_scores)

    return dict(zip(scores.keys(), probs))


@app.post("/sort")
def sort_hat(user: UserInput):
    probs = score_user(user.answers, user.text)
    best_house = max(probs, key=probs.get)
    explanation = f"You show traits that align strongly with {best_house}!"
    return {"house": best_house, "probabilities": probs, "explanation": explanation}

if _name_ == "_main_":
    uvicorn.run(app, host="0.0.0.0", port=8000)
