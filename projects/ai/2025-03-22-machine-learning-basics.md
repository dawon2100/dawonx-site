---
title: "머신러닝 기초"
slug: "machine-learning-basics"
date: "2025-03-22"
category: "ai"
tags: ["머신러닝", "딥러닝"]
---

# 머신러닝 기초

## 개요

머신러닝은 컴퓨터가 명시적으로 프로그래밍되지 않고도 데이터로부터 학습할 수 있게 하는 인공지능의 한 분야입니다. 이 포스트에서는 머신러닝의 기본 개념과 주요 알고리즘에 대해 알아보겠습니다.

## 머신러닝의 종류

### 1. 지도 학습 (Supervised Learning)

지도 학습은 레이블이 있는 데이터셋을 사용하여 모델을 훈련시키는 방법입니다. 입력과 예상 출력이 함께 제공되며, 모델은 이를 통해 패턴을 학습합니다.

**주요 알고리즘:**
- 선형 회귀 (Linear Regression)
- 로지스틱 회귀 (Logistic Regression)
- 서포트 벡터 머신 (Support Vector Machines)
- 결정 트리 (Decision Trees)
- 랜덤 포레스트 (Random Forests)
- 신경망 (Neural Networks)

### 2. 비지도 학습 (Unsupervised Learning)

비지도 학습은 레이블이 없는 데이터를 사용하여 데이터의 숨겨진 패턴이나 내재된 구조를 발견하는 방법입니다.

**주요 알고리즘:**
- K-평균 클러스터링 (K-means Clustering)
- 계층적 클러스터링 (Hierarchical Clustering)
- 주성분 분석 (PCA)
- 이상치 탐지 (Anomaly Detection)

### 3. 강화 학습 (Reinforcement Learning)

강화 학습은 에이전트가 환경과 상호작용하면서 보상을 최대화하는 행동을 학습하는 방법입니다.

**주요 알고리즘:**
- Q-러닝 (Q-Learning)
- 딥 Q-네트워크 (DQN)
- 정책 경사법 (Policy Gradients)

## 머신러닝 프로젝트 워크플로우

1. **문제 정의**: 해결하려는 문제를 명확히 정의
2. **데이터 수집**: 관련 데이터 수집 및 준비
3. **데이터 전처리**: 결측치 처리, 정규화, 피처 엔지니어링
4. **모델 선택**: 문제에 적합한 알고리즘 선택
5. **모델 훈련**: 선택한 알고리즘으로 모델 훈련
6. **모델 평가**: 테스트 데이터로 모델 성능 평가
7. **모델 개선**: 하이퍼파라미터 튜닝 및 모델 최적화
8. **배포**: 실제 환경에 모델 배포

## 파이썬으로 간단한 머신러닝 예제

```python
# 필요한 라이브러리 임포트
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
import matplotlib.pyplot as plt

# 샘플 데이터 생성
X = np.random.rand(100, 1) * 10
y = 2 * X + 1 + np.random.randn(100, 1)

# 훈련 세트와 테스트 세트로 분할
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 선형 회귀 모델 생성 및 훈련
model = LinearRegression()
model.fit(X_train, y_train)

# 예측
y_pred = model.predict(X_test)

# 결과 시각화
plt.scatter(X_test, y_test, color='blue', label='실제 데이터')
plt.plot(X_test, y_pred, color='red', linewidth=2, label='예측')
plt.xlabel('X')
plt.ylabel('y')
plt.title('선형 회귀 예제')
plt.legend()
plt.show()

# 모델 성능 평가
print(f'기울기: {model.coef_[0][0]:.4f}')
print(f'절편: {model.intercept_[0]:.4f}')
```

## 결론

머신러닝은 현대 기술의 중요한 부분이 되었으며, 다양한 산업 분야에서 혁신을 이끌고 있습니다. 이 기초 지식을 바탕으로 더 깊은 개념과 고급 기술을 탐구해 보시기 바랍니다.

## 참고 자료

- "Pattern Recognition and Machine Learning" by Christopher Bishop
- "Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow" by Aurélien Géron
- [Kaggle 강좌](https://www.kaggle.com/learn/intro-to-machine-learning)
- [Stanford CS229: Machine Learning](https://see.stanford.edu/Course/CS229)