<template>
  <div class="extension__inner export-icons">
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
      <div class="export-icons-workspace__buttons">
        <button
            @click.prevent="getIcons"
            id="get-icons"
            class="export-icons-workspace__button button button--theme-secondary button--is-rounded"
        >
          <span class="button__container">
            <span class="button__label">Получить иконки</span>
          </span>
        </button>
        <button
            @click.prevent="findSprites"
            class="export-icons-workspace__button button button--theme-primary button--is-rounded"
        >
          <span class="button__container">
            <span class="button__label">Найти спрайт на странице</span>
          </span>
        </button>
      </div>
    </div>

    <div v-if="isSpriteFound" class="export-icons__founded">
      <ol v-if="spritesOnPage.length !== 0" class="export-icons__sprites export-icons-sprites">
        <li v-for="sprite in spritesOnPage" class="export-icons-sprites__item">
          <button @click.prevent="getSpriteCode(sprite.url)">Спрайт</button>
          <iframe :src="sprite.url" frameborder="0" :name="`frame-${sprite.id}`" :id="`frame-${sprite.id}`"></iframe>
          <a :href="sprite.url" :target="`frame-${sprite.id}`" class="export-icons-sprites__link">{{ sprite.url }}</a>
        </li>
      </ol>
      <p v-else class="export-icons-sprites__empty">Упс! Спрайтов не найдено :(</p>
    </div>

    <div v-if="isExportSuccess" class="export-icons__result">
      <ul class="export-icons__list export-icons-table">
        <li v-for="icon in allIcons" class="export-icons-table__row">
          <div class="export-icons-list__icon icon-single">
            <span v-html="icon.icon" class="icon-single__icon"></span>
            <div class="icon-single__actions">
              <button @click.prevent="showIconCode(icon.iconCode)"
                      class="icon-single__action button button--theme-secondary button--icon-only"
                      aria-label="Скопировать в буфер обмена"
                      title="Скопировать в буфер обмена"
              >
                <span class="button__container">
                  <span class="button__icon icon">
                    <svg class="icon__svg">
                      <use href="./assets/images/icons.svg#icon-copy"></use>
                    </svg>
                  </span>
                </span>
              </button>
              <a
                  :download="icon.iconName"
                  :href="icon.iconLink"
                  class="icon-single__action button button--theme-primary button--icon-only"
                  aria-label="Скачать иконку"
                  title="Скачать иконку"
              >
                <span class="button__container">
                  <span class="button__icon icon">
                    <svg class="icon__svg">
                      <use href="./assets/images/icons.svg#icon-download"></use>
                    </svg>
                  </span>
                </span>
              </a>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <div class="export-icons__version">ver. 1.2.0</div>
  </div>
</template>

<script>
export default {
  data: () => ({
    spriteItems: "",
    allIcons: [],
    isExportSuccess: false,
    spritesOnPage: [],
    isSpriteFound: false,
    spriteUrlCode: ''
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
    },
    showIconCode(iconCode) {
      let iconCodeToCopy = iconCode;
      this.$swal({
        input: 'textarea',
        inputLabel: 'Message',
        inputValue: iconCode,
        showCancelButton: true,
        confirmButtonText: 'Копировать',
        cancelButtonText: 'Закрыть'
      }).then((result) => {
        if (result.isConfirmed) {
          let iconCodeValue = this.$swal.getInput().value;
          navigator.clipboard.writeText(iconCodeValue).then(function () {
            console.log('Async: Copying to clipboard was successful!');
          }, function (err) {
            console.error('Async: Could not copy text: ', err);
          });

          this.$swal('Скопировано в буфер обмена!', '', 'success')
        }
      });
    },
    findSprites() {
      this.isSpriteFound = false;

      let spritesOnPage = localStorage.getItem('total_elements');
      this.spritesOnPage = JSON.parse(spritesOnPage);

      this.isSpriteFound = true;
    },
    getSpriteCode(spriteUrl) {
      let mySwal = this.$swal;
      fetch(spriteUrl).then((response) => {
        return response.text();
      }).then(function (data) {
        mySwal({
          input: 'textarea',
          inputLabel: 'Message',
          inputValue: data,
          showCancelButton: true,
          confirmButtonText: 'Копировать',
          cancelButtonText: 'Закрыть'
        }).then((result) => {
          if (result.isConfirmed) {
            let iconCodeValue = mySwal.getInput().value;
            navigator.clipboard.writeText(iconCodeValue).then(function () {
              console.log('Async: Copying to clipboard was successful!');
            }, function (err) {
              console.error('Async: Could not copy text: ', err);
            });

            mySwal('Скопировано в буфер обмена!', '', 'success')
          }
        });
      });
        // response.text().then(function(codeMarkup) {
        //   this.spriteUrlCode = codeMarkup;
        // })
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
  color: inherit;
}

.extension {
  min-width: 500px;
}

.export-icons {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 50px 15px 15px;

  &__workspace {
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

  &__buttons {
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
}

.button {
  max-width: 100%;
  min-height: 40px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  text-align: center;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, border 0.2s ease-in-out;

  &--is-rounded {
    border-radius: 40px;
  }

  &--icon-only {
    padding: 10px;

    .button__icon {
      width: 50px;
      height: 50px;

      .icon__svg {
        fill: #fff;
      }
    }
  }

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
  grid-template-columns: repeat(3, 1fr);
  list-style: none;
  grid-gap: 20px;

  &__cell {
    display: flex;
    align-items: center;
    padding: 15px;
  }
}

.icon-single {
  &__icon {
    display: block;
    background: url('assets/images/icon_bg.jpg') no-repeat center/cover;
    width: 150px;
    height: 150px;
    padding: 15px;

    .icon__svg {
      fill: #fff;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
  }

  &__action {
    flex: 1 1 50%;
    max-width: 50%;
  }
}

.icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.export-icons-sprites {
  &__item {
    & + & {
      margin-top: 10px;
    }
  }

  &__link {
    color: #1f5584;
    text-decoration: underline;
  }
}
</style>
