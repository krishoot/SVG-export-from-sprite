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
          <button @click.prevent="getSpriteCode(sprite.url)"
                  class="export-icons-sprites__button button button--theme-secondary button--size-s">
            <span class="button__container">
              <span class="button__label">Скопировать код спрайта</span>
            </span>
          </button>
          <div class="export-icons-sprites__link export-icons-sprites-link">
            <span class="export-icons-sprites-link__title">Ссылка на спрайт:</span>
            <a :href="sprite.url" :target="`frame-${sprite.id}`" class="export-icons-sprites-link__url">{{
                sprite.url
              }}</a>
          </div>
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

    <div class="export-icons__version">ver. 1.5.0</div>
  </div>
</template>

<script>
import {sendMessageToContent} from "./utils/sendMessageToContent";

export default {
  data: () => ({
    spriteItems: "",
    allIcons: [],
    isExportSuccess: false,
    spritesOnPage: [],
    isSpriteFound: false,
    spriteUrlCode: ''
  }),
  watch() {
    chrome.action.onClicked.addListener(function () {
      console.log('open');
    })
  },
  methods: {
    getIcons() {
      this.isExportSuccess = false;
      this.isSpriteFound = false;
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
      sendMessageToContent({type: 1}, 'error', () => {
      }, (response) => {
        this.isSpriteFound = false;
        this.isExportSuccess = false;
        this.spritesOnPage = response.total_elements;

        sessionStorage.setItem('spritesInStorage', JSON.stringify(this.spritesOnPage))

        this.isSpriteFound = true;
      })
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
    }
  }
};
</script>

<style lang="scss">
@import 'assets/scss/main';
</style>
