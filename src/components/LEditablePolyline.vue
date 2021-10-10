<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
import L from "leaflet"
import "tf-leaflet-editble-polyline"

export default {
  name: "LEditablePolyline",
  props: {
    points: {
      type: Array,
      required: true
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.createPolylines()
    document.addEventListener("leafletPolylineDragEnd", this.onChange)
    document.addEventListener("leafletPolylineRemovePoint", this.onChange)
    document.addEventListener("leafletPolylineUpdate", this.onChange)
    document.addEventListener("leafletPolylineAddPoint", this.pointAdded)
  },
  beforeDestroy() {
    this.removePolylines()
    document.removeEventListener("leafletPolylineDragEnd", this.onChange)
    document.removeEventListener("leafletPolylineRemovePoint", this.onChange)
    document.removeEventListener("leafletPolylineUpdate", this.onChange)
    document.removeEventListener("leafletPolylineAddPoint", this.pointAdded)
  },
  watch: {
    points() {
      if (this.$parent.mapObject && this.mapObject) {
        this.mapObject.setPoints(this.points, this.options)
      }
    }
  },
  computed: {
    polylineOptions() {
      // Добавляем к опциям полилинии уникальный идентификатор компонента
      // это нужно для отслеживания событий
      let options = Object.assign({ uid: this._uid }, this.options)

      if (!options.pointIcon) {
        options.pointIcon = this.$consts.ICON_POINT_DEFAULT
      }
      if (!options.newPointIcon) {
        options.pointIcon = this.$consts.ICON_POINT_DEFAULT
      }

      return options
    }
  },
  methods: {
    // Полилиния изменилась (после перерисовки)
    onChange(event) {
      // Проверяем, что событие сработало на полилинии привязанной к этому компоненту
      if (!this.$parent || !this.$parent.mapObject || (this._uid !== event.detail.uid)) {
        return
      }
      this.$emit("change", event.detail.points)
    },
    // Была добавлена точка (до перерисовки)
    pointAdded(event) {
      // Проверяем, что событие сработало на полилинии привязанной к этому компоненту
      if (!this.$parent || !this.$parent.mapObject || (this._uid !== event.detail.uid)) {
        return
      }
      this.$emit("pointAdded", event.detail.points)
    },
    createPolylines() {
      this.mapObject = L.Polyline.PolylineEditor(this.points, this.polylineOptions)
      if (this.$parent._isMounted) {
        this.deferredMountedTo(this.$parent.mapObject)
      }
      this.$emit("ready")
    },
    deferredMountedTo(parent) {
      this.parent = parent
      let that = this.mapObject
      // Добавляем полилинии и маркеры к карте родительского компонента
      for (let i = 0; i < this.$children.length; i++) {
        if (typeof this.$children[i].deferredMountedTo == "function") {
          this.$children[i].deferredMountedTo(that)
        }
      }
      this.mapObject.addTo(parent)
    },
    removePolylines() {
      if (this.parent && this.parent.mapObject) {
        let polys = this.parent.mapObject.getEditablePolylines()
        polys.forEach(poly => this.parent.mapObject.removeLayer(poly))
      }
    }
  }
}
</script>
