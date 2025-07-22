<template>
  <div class="dice" :class="{ 'rolling': isRolling }" @click="roll">
    <div class="face">
      <div v-for="dot in dots" :key="dot.id" 
           class="dot" 
           :style="{ top: dot.top + '%', left: dot.left + '%' }">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DiceComponent',
  props: {
    initialValue: {
      type: Number,
      default: () => Math.floor(Math.random() * 6) + 1
    }
  },
  data() {
    return {
      currentNumber: this.initialValue,
      isRolling: false,
      dotPositions: {
        1: [{id: 1, top: 50, left: 50}],
        2: [{id: 1, top: 25, left: 25}, {id: 2, top: 75, left: 75}],
        3: [{id: 1, top: 25, left: 25}, {id: 2, top: 50, left: 50}, {id: 3, top: 75, left: 75}],
        4: [{id: 1, top: 25, left: 25}, {id: 2, top: 25, left: 75}, 
            {id: 3, top: 75, left: 25}, {id: 4, top: 75, left: 75}],
        5: [{id: 1, top: 25, left: 25}, {id: 2, top: 25, left: 75}, 
            {id: 3, top: 50, left: 50},
            {id: 4, top: 75, left: 25}, {id: 5, top: 75, left: 75}],
        6: [{id: 1, top: 25, left: 25}, {id: 2, top: 25, left: 75}, 
            {id: 3, top: 50, left: 25}, {id: 4, top: 50, left: 75},
            {id: 5, top: 75, left: 25}, {id: 6, top: 75, left: 75}]
      }
    }
  },
  computed: {
    dots() {
      return this.dotPositions[this.currentNumber]
    }
  },
  methods: {
    roll() {
      if (this.isRolling) return
      this.isRolling = true
      const duration = 1000
      const startTime = Date.now()
      
      const animate = () => {
        const now = Date.now()
        const elapsed = now - startTime
        
        if (elapsed < duration) {
          this.currentNumber = Math.floor(Math.random() * 6) + 1
          requestAnimationFrame(animate)
        } else {
          const finalNumber = Math.floor(Math.random() * 6) + 1
          this.currentNumber = finalNumber
          this.isRolling = false
          this.$emit('numberChanged', finalNumber)
        }
      }
      
      requestAnimationFrame(animate)
    }
  }
}
</script>

<style scoped>
.dice {
  width: 150px;
  height: 150px;
  position: relative;
  cursor: pointer;
  perspective: 1000px;
  margin: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 15%;
  box-shadow: 
    0 8px 16px rgba(0, 0, 0, 0.1),
    0 2px 4px rgba(0, 0, 0, 0.1);
}

.dice:hover {
  transform: scale(1.05) translateY(-5px);
  box-shadow: 
    0 12px 24px rgba(0, 0, 0, 0.15),
    0 4px 8px rgba(0, 0, 0, 0.1);
}

.dice:active {
  transform: scale(0.95);
  box-shadow: 
    0 4px 8px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.1);
}

.face {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
  border-radius: 15%;
  box-shadow: 
    inset 0 2px 4px rgba(255, 255, 255, 0.5),
    inset 0 -2px 4px rgba(0, 0, 0, 0.05);
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.3s ease;
}

.dot {
  position: absolute;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #333 0%, #000 100%);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 
    inset 0 3px 5px rgba(255, 255, 255, 0.2),
    0 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.dice:hover .dot {
  transform: translate(-50%, -50%) scale(1.1);
}

.rolling .face {
  animation: roll 1s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

.rolling .dot {
  animation: pulse 1s ease infinite;
}

@keyframes roll {
  0% { transform: rotateX(0deg) rotateY(0deg); }
  50% { transform: rotateX(180deg) rotateY(180deg) scale(0.95); }
  100% { transform: rotateX(360deg) rotateY(360deg); }
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); }
  50% { transform: translate(-50%, -50%) scale(0.9); }
  100% { transform: translate(-50%, -50%) scale(1); }
}
</style>
