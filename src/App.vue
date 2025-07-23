<template>
  <div id="app">
    <div class="game-container">
      <h1>骰子游戏-TEST</h1>
      <p class="instruction">点击任意骰子或"掷所有骰子"按钮开始游戏</p>
      <div class="total-score">总点数: {{ totalScore }}</div>
      <div class="dice-container">
        <DiceComponent 
          v-for="(dice, index) in dices" 
          :key="index"
          :ref="'dice' + index"
          :initialValue="dice"
          @numberChanged="updateScore(index, $event)"
        />
      </div>
      <button class="roll-all-btn" @click="rollAll">
        <span class="btn-text">掷所有骰子</span>
        <span class="btn-shine"></span>
      </button>
    </div>
  </div>
</template>

<script>
import DiceComponent from './components/Dice.vue'

export default {
  name: 'App',
  components: {
    DiceComponent
  },
  data() {
    return {
      dices: Array(6).fill(0).map(() => Math.floor(Math.random() * 6) + 1),
      scores: Array(6).fill(1)
    }
  },
  computed: {
    totalScore() {
      return this.scores.reduce((sum, score) => sum + score, 0)
    }
  },
  methods: {
    updateScore(index, newValue) {
      this.scores[index] = newValue
    },
    rollAll() {
      for (let i = 0; i < 6; i++) {
        const diceRef = this.$refs[`dice${i}`];
        if (diceRef && diceRef[0]) {
          diceRef[0].roll();
        }
      }
    }
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.game-container {
  padding: 40px;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  width: 90%;
}

h1 {
  margin: 0 0 20px;
  color: #34495e;
  font-size: 2.5em;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.instruction {
  color: #7f8c8d;
  margin-bottom: 30px;
  font-size: 1.2em;
}

.total-score {
  font-size: 2.2em;
  font-weight: bold;
  color: #2c3e50;
  margin: 30px 0;
  padding: 15px 30px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.8));
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: inline-block;
  position: relative;
  overflow: hidden;
}

.total-score::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3498db, #2ecc71);
}

.dice-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  padding: 30px;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-shadow: 
    inset 0 0 20px rgba(0, 0, 0, 0.05),
    0 10px 30px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
  backdrop-filter: blur(10px);
}

.roll-all-btn {
  padding: 15px 30px;
  font-size: 1.3em;
  font-weight: bold;
  color: white;
  background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 6px 12px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.roll-all-btn:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.15),
    0 3px 6px rgba(0, 0, 0, 0.1);
  background: linear-gradient(135deg, #2980b9 0%, #2471a3 100%);
}

.roll-all-btn:active {
  transform: translateY(1px);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.1);
}

.btn-shine {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 45%,
    rgba(255, 255, 255, 0.1) 48%,
    rgba(255, 255, 255, 0.3) 50%,
    rgba(255, 255, 255, 0.1) 52%,
    transparent 55%
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    top: -50%;
    left: -50%;
  }
  100% {
    top: 150%;
    left: 150%;
  }
}
</style>
