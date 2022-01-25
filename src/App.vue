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
          <div class="export-icons-table__cell export-icons-table__cell--icon">
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

    <a download="SVG-export-from-sprite-extension[1.5.0].zip"
       href="./extension/SVG-export-from-sprite-extension[1.5.0].zip"
       class="export-icons__download-extension">
      Скачать расширение для Chrome
    </a>

    <div class="export-icons__version">ver. 1.15</div>
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
      this.allIcons = [];

      if (this.spriteItems === "") {
        this.$swal({
          icon: 'error',
          title: 'Упс!',
          text: 'Пожалуйста, вставьте код спрайта!'
        });

        return;
      }

      let re = /symbol/gi;

      let lines = this.spriteItems.split("<svg");
      lines = lines[1].split("</svg>");
      lines = lines[0].split("<symbol");
      lines.splice(0, 1);

      let values = [].map.call(lines, function (obj) {
        return '<svg xmlns="http://www.w3.org/2000/svg"' + obj.replace(re, "svg");
      });

      values.forEach((icon, index) => {
        let blob = new Blob([icon], {type: "image/svg+xml"});
        this.allIcons.push({
          icon: icon,
          iconCode: icon,
          iconLink: URL.createObjectURL(blob),
          iconName: "icon-" + index + '.svg'
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
    position: relative;
  }

  html,
  body {
    height: 100%;
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

    &__version {
      position: absolute;
      right: 15px;
      top: 15px;
      color: #b5b5b5;
    }

    &__download-extension {
      color: #1f5584;
      position: absolute;
      left: 15px;
      top: 15px;
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
    transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border 0.2s ease-in-out;

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

      &--icon {
        background: url('assets/images/icon_bg.jpg') no-repeat center/cover;
      }
    }
  }

  .export-icons-list {
    &__code {
      word-break: break-word;
    }
  }
</style>
