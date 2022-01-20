<template>
  <div class="export-icons">
    <div class="export-icons__workspace export-icons-workspace">
      <textarea
          v-model="spriteItems"
          name="sprite"
          id="sprite"
          class="export-icons-workspace__textarea"
          cols="30"
          rows="10"
          placeholder="Вставьте сюда код спрайта"
      ></textarea>
      <button
          @click.prevent="getIcons"
          id="get-icons"
          class="export-icons-workspace__button button button--theme-secondary"
      >
            <span class="button__container">
          <span class="button__label">Получить иконки</span>
        </span>
      </button>
    </div>

    <div v-if="isExportSuccess" class="export-icons__result">
      <ul class="export-icons__list export-icons-table">
        <li v-for="icon in allIcons" class="export-icons-table__row">
          <div class="export-icons-table__cell">
            <span v-html="icon.icon" class="export-icons-list__icon"></span>
          </div>
          <div class="export-icons-table__cell">
            <span class="export-icons-list__code">{{ icon.iconCode }}</span>
          </div>
          <div class="export-icons-table__cell">
            <a
                :download="icon.iconName"
                :href="icon.iconLink"
                class="export-icons-list__link button button--theme-primary"
            >
              <span class="button__container">
                <span class="button__label">Скачать иконку</span>
              </span>
            </a>
          </div>
        </li>
      </ul>
    </div>

    <svg>
      <symbol
          id="icon-1"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
              d="M16,2A14,14,0,1,0,30,16,14,14,0,0,0,16,2Zm0,26A12,12,0,1,1,28,16,12,12,0,0,1,16,28Z"
          />
          <path
              d="M17,7H15v8.52a2,2,0,0,0,.75,1.56l4.63,3.7,1.24-1.56L17,15.52Z"
          />
        </g>
      </symbol>
      <symbol
          id="icon-2"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <polygon
              points="28.71 4.71 27.29 3.29 16 14.59 4.71 3.29 3.29 4.71 14.59 16 3.29 27.29 4.71 28.71 16 17.41 27.29 28.71 28.71 27.29 17.41 16 28.71 4.71"
          />
        </g>
      </symbol>
      <symbol
          id="icon-3"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
              d="M16,2,3,6.28V12C3,26.61,15.63,29.94,15.76,30L16,30l.24-.06c.13,0,12.76-3.36,12.76-18V6.28ZM27,12c0,12.1-9.31,15.45-11,16C14.31,27.45,5,24.1,5,12V7.72L16,4.05,27,7.72Z"
          />
          <path
              d="M11.59,15l-1.42,1.41,2.29,2.29a2,2,0,0,0,1.42.59,2,2,0,0,0,1.41-.59l6.54-6.53-1.42-1.42-6.53,6.54Z"
          />
        </g>
      </symbol>
    </svg>
  </div>
</template>

<script>
export default {
  data: () => ({
    spriteItems: "",
    allIcons: [],
    isExportSuccess: false
  }),
  methods: {
    getIcons() {
      this.isExportSuccess = false;

      if (this.spriteItems === "") {
        alert("Пожалуйста, вставьте код спрайта!");
      }

      let re = /symbol/gi;

      let lines = this.spriteItems.split("<svg>");
      lines = lines[1].split("</svg>");
      lines = lines[0].split("<symbol");
      lines.splice(0, 1);

      let values = [].map.call(lines, function (obj) {
        return "<svg" + obj.replace(re, "svg");
      });

      values.forEach((icon, index) => {
        let blob = new Blob([icon], {type: "image/svg+xml"});
        this.allIcons.push({
          icon: icon,
          iconCode: icon,
          iconLink: URL.createObjectURL(blob),
          iconName: "icon-" + index
        });
      });

      this.isExportSuccess = true;
    }
  }
};
</script>

<style lang="scss">
  * {
    box-sizing: border-box;
  }

  svg {
    width: 100%;
    height: 100%;
    display: block;
    fill: currentColor;
  }

  body {
    margin: 0;
    font-size: 16px;
    font-family: Roboto, Arial, sans-serif;
  }

  button,
  textarea {
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    background-color: transparent;
    color: inherit;
    box-shadow: none;
    font: inherit;
    letter-spacing: inherit;
  }

  button {
    cursor: pointer;
  }

  a {
    text-decoration: none;
  }

  .export-icons {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 50px;

    &__workspace {
      max-width: 50%;
      width: 100%;
    }

    &__result {
      margin-top: 50px;
    }
  }

  .export-icons-workspace {
    display: flex;
    flex-direction: column;
    align-items: center;

    &__textarea {
      resize: none;
      width: 100%;
      padding: 15px;
      border: 1px solid #00375e;
      border-radius: 4px;
      transition: border-color 0.2s ease-in-out;

      &:focus {
        outline: none;
        border-color: lighten(#00375e, 15%);
      }
    }

    &__button {
      margin-top: 25px;
    }
  }

  .button {
    max-width: 100%;
    min-height: 40px;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 15px 30px;
    border-radius: 40px;
    text-align: center;
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out;

    &__container {
      flex: auto 0 1;
      min-width: 0;
      white-space: nowrap;
    }

    &__label {
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #ffffff;
    }

    &--theme-primary {
      background-color: #276aa5;

      &:hover {
        background-color: #1f5584;
      }
    }

    &--theme-secondary {
      background-color: #25a248;

      &:hover {
        background-color: #229643;
      }
    }
  }

  .export-icons-table {
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    border: 1px solid #00375e;
    border-radius: 4px;

    &__row {
      display: grid;
      grid-template-columns: 150px 1fr auto;

      &:not(:last-child) {
        border-bottom: 1px solid #00375e;
      }
    }

    &__cell {
      display: flex;
      align-items: center;
      padding: 15px;

      &:not(:last-child) {
        border-right: 1px solid #00375e;
      }
    }
  }
</style>
