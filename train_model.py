import os
import pickle
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error, r2_score
from xgboost import XGBRegressor

# ==========================================
# CREATE MODEL DIRECTORY
# ==========================================

os.makedirs("model", exist_ok=True)

# ==========================================
# LOAD DATASET
# ==========================================

df = pd.read_csv("dataset/advanced_realistic_ipl_dataset.csv")

print("Dataset Loaded Successfully")
print("Shape:", df.shape)

# ==========================================
# FEATURES & TARGET
# ==========================================

features = [
    'venue',
    'batting_team',
    'bowling_team',
    'balls_left',
    'current_score',
    'wickets',
    'wickets_left',
    'current_run_rate',
    'required_run_rate',
    'phase',
    'batting_strength',
    'bowling_strength',
    'venue_factor',
    'momentum_factor',
    'projected_score_live'
]

target = 'final_score'

# Keep only required columns
df = df[features + [target]]

# ==========================================
# ONE HOT ENCODING
# ==========================================

df_encoded = pd.get_dummies(
    df,
    columns=[
        'venue',
        'batting_team',
        'bowling_team',
        'phase'
    ]
)

print("Encoding Completed")

# ==========================================
# SPLIT FEATURES & TARGET
# ==========================================

X = df_encoded.drop(target, axis=1)
y = df_encoded[target]

# ==========================================
# TRAIN TEST SPLIT
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

print("Train/Test Split Done")

# ==========================================
# XGBOOST MODEL
# ==========================================

model = XGBRegressor(
    n_estimators=500,
    learning_rate=0.03,
    max_depth=10,
    subsample=0.85,
    colsample_bytree=0.85,
    objective='reg:squarederror',
    random_state=42
)

# ==========================================
# TRAIN MODEL
# ==========================================

print("Training Started...")

model.fit(X_train, y_train)

print("Training Completed")

# ==========================================
# PREDICTIONS
# ==========================================

predictions = model.predict(X_test)

# ==========================================
# EVALUATION
# ==========================================

mae = mean_absolute_error(y_test, predictions)
r2 = r2_score(y_test, predictions)

print("\n========== MODEL PERFORMANCE ==========")
print(f"MAE       : {mae:.2f}")
print(f"R2 Score  : {r2:.4f}")

# ==========================================
# SAVE MODEL
# ==========================================

pickle.dump(
    model,
    open("model/ipl_xgboost_model.pkl", "wb")
)

# Save column names
pickle.dump(
    X.columns,
    open("model/model_columns.pkl", "wb")
)

print("\nModel Saved Successfully")

print("\nSaved Files:")
print("1. model/ipl_xgboost_model.pkl")
print("2. model/model_columns.pkl")