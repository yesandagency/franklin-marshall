<template>
  <div>
    <div class="bg-blue-light py-10">
      <div class="container flex justify-between items-center">
        <h2 class="hidden lg:block title-md">{{ activeOption }}</h2>
        <div class="form w-full md:w-1/2 lg:w-1/3 flex-shrink-0">
          <div
            class="form-field"
            style="margin-bottom:0"
          >
            <label for="semester-select">View Semester</label>
            <select
              id="semester-select"
              style="background-color:#fff;"
              v-model="activeOption"
              @change="onSelect"
            >
              <option
                v-for="option in options"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  mounted() {
    const tables = this.$el.querySelectorAll(`[data-academic-table]`);
    tables.forEach((table, index) => {
      const title = table.getAttribute('data-title');
      this.options.push(title);
      if (index === 0) {
        this.activeOption = title;
        return;
      }
      table.style.display = 'none';
    });
  },
  data() {
    return {
      activeOption: '',
      options: [],
    };
  },
  methods: {
    onSelect() {
      const tables = this.$el.querySelectorAll(`[data-academic-table]`);
      tables.forEach((table) => {
        if (table.getAttribute('data-title') === this.activeOption) {
          table.style = false;
          return;
        }
        table.style.display = 'none';
      });
    },
  },
};
</script>
