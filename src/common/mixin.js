export const tabControlMixin = {
  data: function () {
    return {
      currentType: "pop"
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop"
          break
        case 1:
          this.currentType = "new"
          break
        case 2:
          this.currentType = "sell"
          break
      }
      console.log(this.currentType);
    }
  }
}