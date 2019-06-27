(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("iview"), require("vuedraggable"));
	else if(typeof define === 'function' && define.amd)
		define(["iview", "vuedraggable"], factory);
	else if(typeof exports === 'object')
		exports["Upload"] = factory(require("iview"), require("vuedraggable"));
	else
		root["PeaceIview"] = root["PeaceIview"] || {}, root["PeaceIview"]["Upload"] = factory(root["iview"], root["vuedraggable"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_iview_dist_iview__, __WEBPACK_EXTERNAL_MODULE_vuedraggable__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/components/upload/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/upload/index.js":
/*!****************************************!*\
  !*** ./src/components/upload/index.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

let {Upload, Icon, Progress} = __webpack_require__(/*! iview/dist/iview */ "iview/dist/iview");
let Draggable = __webpack_require__(/*! vuedraggable */ "vuedraggable");

module.exports = {
    name: 'Upload',
    template: `
    <Draggable class="upload" :list="currentItems" @change="setModelValue" :options="{draggable:'.upload-item'}">
        <div class="upload-item" v-for="item in currentItems" :key="item.id">
            <template v-if="item.status === 'finished'">
                <slot name="content" class="upload-item-content" :item="item"></slot>
                <div class="upload-item-cover">
                    <Icon type="ios-eye-outline" @click.native="view(item)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
            </template>
            <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
        </div>
        <Upload
                ref="upload"
                type="drag"
                :show-upload-list="false"
                :default-file-list="items"
                :on-success="handleSuccess"
                :format="format"
                :max-size="maxSize"
                :on-format-error="handleFormatError"
                :on-exceeded-size="handleMaxSize"
                :before-upload="handleBeforeUpload"
                :action="action"
                class="upload-selector"
                v-show="showUploader">
            <div>{{text}}</div>
        </Upload>
    </Draggable>`,
    model: {
        prop: 'items',
    },
    props: {
        /**模型属性，组件内不能修改，该属性在组件内无具体用处*/
        items: {type: Array, default() {return [];}},
        /**请求地址*/
        action: {type: String, default: '/file',},
        /**选择图片的文本内容*/
        text: {type: String, required: true},
        /**数据格式化器，格式化服务端返回的数据，组件接收的数据格式为：{id: '', url: ''}*/
        formatData: {type: Function, default: function (res) {return res;}},
        /**文件格式*/
        format: {type: Array, required: true,},
        /**可上传的最大文件数*/
        maxCount: {type: Number, default: 5},
        /**可上传的文件大小*/
        maxSize: {type: Number, default: 1024 * 2},
    },
    data() {
        return {
            currentItems: [],
        };
    },
    methods: {
        /**同步模型数据*/
        setModelValue() {
            this.$emit('input', [...this.currentItems.map(file => ({id: file.id, url: file.url}))]);
        },
        /**查看*/
        view(item) {
            window.open(item.url, 'target=_blank')
        },
        handleSuccess(res, file) {
            let data = this.formatData(res);
            file.id = data.id;
            file.url = data.url;
            this.setModelValue();
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: `文件'${file.name}'格式不正确，请上传[${this.format.join('、')}]格式的文件`
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: `文件'${file.name}'太大，不能超过 ${this.maxSize / 1024}M`
            });
        },
        handleBeforeUpload() {
            const check = this.currentItems.length < this.maxCount;
            if (!check) this.$Notice.warning({title: `最多只能上传${this.maxCount}个文件`});
            return check;
        },
        handleRemove(file) {
            this.currentItems.splice(this.currentItems.indexOf(file), 1);
            this.setModelValue();
        },
    },
    computed: {
        showUploader() {
            return this.maxCount > this.currentItems.length;
        },
    },
    mounted() {
        this.currentItems = this.$refs.upload.fileList;
    },
    watch: {
        items() {
            //items->defaultFileList->fileList->currentItems
            this.$nextTick(() => this.currentItems = this.$refs.upload.fileList);
        }
    },
    components: {
        Upload,
        Draggable,
        Progress,
        Icon
    },
};



/***/ }),

/***/ "iview/dist/iview":
/*!************************!*\
  !*** external "iview" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_iview_dist_iview__;

/***/ }),

/***/ "vuedraggable":
/*!*******************************!*\
  !*** external "vuedraggable" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_vuedraggable__;

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9QZWFjZUl2aWV3LltuYW1lXS93ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24iLCJ3ZWJwYWNrOi8vUGVhY2VJdmlldy5bbmFtZV0vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vUGVhY2VJdmlldy5bbmFtZV0vLi9zcmMvY29tcG9uZW50cy91cGxvYWQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vUGVhY2VJdmlldy5bbmFtZV0vZXh0ZXJuYWwgXCJpdmlld1wiIiwid2VicGFjazovL1BlYWNlSXZpZXcuW25hbWVdL2V4dGVybmFsIFwidnVlZHJhZ2dhYmxlXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQztBQUMvQyxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEZBLEtBQUssdUJBQXVCLEdBQUcsbUJBQU8sQ0FBQywwQ0FBa0I7QUFDekQsZ0JBQWdCLG1CQUFPLENBQUMsa0NBQWM7O0FBRXRDO0FBQ0E7QUFDQTtBQUNBLHNGQUFzRix5QkFBeUI7QUFDL0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixNQUFNO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxnQkFBZ0Isd0JBQXdCLFlBQVk7QUFDcEQ7QUFDQSxpQkFBaUIsZ0NBQWdDO0FBQ2pEO0FBQ0EsZUFBZSw2QkFBNkI7QUFDNUMsMENBQTBDLGdCQUFnQjtBQUMxRCxxQkFBcUIseUNBQXlDLGFBQWE7QUFDM0U7QUFDQSxpQkFBaUIsNkJBQTZCO0FBQzlDO0FBQ0EsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBLGtCQUFrQixnQ0FBZ0M7QUFDbEQsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSwyQkFBMkI7QUFDL0YsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVLGFBQWEsc0JBQXNCO0FBQ3pFLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVUsV0FBVyxvQkFBb0I7QUFDckUsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsOENBQThDLGdCQUFnQixjQUFjLEtBQUs7QUFDakY7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7O0FDckhBLDhEOzs7Ozs7Ozs7OztBQ0FBLDBEIiwiZmlsZSI6ImNvbXBvbmVudHMvdXBsb2FkL2luZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiaXZpZXdcIiksIHJlcXVpcmUoXCJ2dWVkcmFnZ2FibGVcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiaXZpZXdcIiwgXCJ2dWVkcmFnZ2FibGVcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiVXBsb2FkXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiaXZpZXdcIiksIHJlcXVpcmUoXCJ2dWVkcmFnZ2FibGVcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlBlYWNlSXZpZXdcIl0gPSByb290W1wiUGVhY2VJdmlld1wiXSB8fCB7fSwgcm9vdFtcIlBlYWNlSXZpZXdcIl1bXCJVcGxvYWRcIl0gPSBmYWN0b3J5KHJvb3RbXCJpdmlld1wiXSwgcm9vdFtcInZ1ZWRyYWdnYWJsZVwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2l2aWV3X2Rpc3RfaXZpZXdfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV92dWVkcmFnZ2FibGVfXykge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2NvbXBvbmVudHMvdXBsb2FkL2luZGV4LmpzXCIpO1xuIiwibGV0IHtVcGxvYWQsIEljb24sIFByb2dyZXNzfSA9IHJlcXVpcmUoJ2l2aWV3L2Rpc3QvaXZpZXcnKTtcbmxldCBEcmFnZ2FibGUgPSByZXF1aXJlKCd2dWVkcmFnZ2FibGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbmFtZTogJ1VwbG9hZCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICA8RHJhZ2dhYmxlIGNsYXNzPVwidXBsb2FkXCIgOmxpc3Q9XCJjdXJyZW50SXRlbXNcIiBAY2hhbmdlPVwic2V0TW9kZWxWYWx1ZVwiIDpvcHRpb25zPVwie2RyYWdnYWJsZTonLnVwbG9hZC1pdGVtJ31cIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInVwbG9hZC1pdGVtXCIgdi1mb3I9XCJpdGVtIGluIGN1cnJlbnRJdGVtc1wiIDprZXk9XCJpdGVtLmlkXCI+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1pZj1cIml0ZW0uc3RhdHVzID09PSAnZmluaXNoZWQnXCI+XG4gICAgICAgICAgICAgICAgPHNsb3QgbmFtZT1cImNvbnRlbnRcIiBjbGFzcz1cInVwbG9hZC1pdGVtLWNvbnRlbnRcIiA6aXRlbT1cIml0ZW1cIj48L3Nsb3Q+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVwbG9hZC1pdGVtLWNvdmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxJY29uIHR5cGU9XCJpb3MtZXllLW91dGxpbmVcIiBAY2xpY2submF0aXZlPVwidmlldyhpdGVtKVwiPjwvSWNvbj5cbiAgICAgICAgICAgICAgICAgICAgPEljb24gdHlwZT1cImlvcy10cmFzaC1vdXRsaW5lXCIgQGNsaWNrLm5hdGl2ZT1cImhhbmRsZVJlbW92ZShpdGVtKVwiPjwvSWNvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICAgICAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgICAgICAgICAgIDxQcm9ncmVzcyB2LWlmPVwiaXRlbS5zaG93UHJvZ3Jlc3NcIiA6cGVyY2VudD1cIml0ZW0ucGVyY2VudGFnZVwiIGhpZGUtaW5mbz48L1Byb2dyZXNzPlxuICAgICAgICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxVcGxvYWRcbiAgICAgICAgICAgICAgICByZWY9XCJ1cGxvYWRcIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJkcmFnXCJcbiAgICAgICAgICAgICAgICA6c2hvdy11cGxvYWQtbGlzdD1cImZhbHNlXCJcbiAgICAgICAgICAgICAgICA6ZGVmYXVsdC1maWxlLWxpc3Q9XCJpdGVtc1wiXG4gICAgICAgICAgICAgICAgOm9uLXN1Y2Nlc3M9XCJoYW5kbGVTdWNjZXNzXCJcbiAgICAgICAgICAgICAgICA6Zm9ybWF0PVwiZm9ybWF0XCJcbiAgICAgICAgICAgICAgICA6bWF4LXNpemU9XCJtYXhTaXplXCJcbiAgICAgICAgICAgICAgICA6b24tZm9ybWF0LWVycm9yPVwiaGFuZGxlRm9ybWF0RXJyb3JcIlxuICAgICAgICAgICAgICAgIDpvbi1leGNlZWRlZC1zaXplPVwiaGFuZGxlTWF4U2l6ZVwiXG4gICAgICAgICAgICAgICAgOmJlZm9yZS11cGxvYWQ9XCJoYW5kbGVCZWZvcmVVcGxvYWRcIlxuICAgICAgICAgICAgICAgIDphY3Rpb249XCJhY3Rpb25cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwidXBsb2FkLXNlbGVjdG9yXCJcbiAgICAgICAgICAgICAgICB2LXNob3c9XCJzaG93VXBsb2FkZXJcIj5cbiAgICAgICAgICAgIDxkaXY+e3t0ZXh0fX08L2Rpdj5cbiAgICAgICAgPC9VcGxvYWQ+XG4gICAgPC9EcmFnZ2FibGU+YCxcbiAgICBtb2RlbDoge1xuICAgICAgICBwcm9wOiAnaXRlbXMnLFxuICAgIH0sXG4gICAgcHJvcHM6IHtcbiAgICAgICAgLyoq5qih5Z6L5bGe5oCn77yM57uE5Lu25YaF5LiN6IO95L+u5pS577yM6K+l5bGe5oCn5Zyo57uE5Lu25YaF5peg5YW35L2T55So5aSEKi9cbiAgICAgICAgaXRlbXM6IHt0eXBlOiBBcnJheSwgZGVmYXVsdCgpIHtyZXR1cm4gW107fX0sXG4gICAgICAgIC8qKuivt+axguWcsOWdgCovXG4gICAgICAgIGFjdGlvbjoge3R5cGU6IFN0cmluZywgZGVmYXVsdDogJy9maWxlJyx9LFxuICAgICAgICAvKirpgInmi6nlm77niYfnmoTmlofmnKzlhoXlrrkqL1xuICAgICAgICB0ZXh0OiB7dHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZX0sXG4gICAgICAgIC8qKuaVsOaNruagvOW8j+WMluWZqO+8jOagvOW8j+WMluacjeWKoeerr+i/lOWbnueahOaVsOaNru+8jOe7hOS7tuaOpeaUtueahOaVsOaNruagvOW8j+S4uu+8mntpZDogJycsIHVybDogJyd9Ki9cbiAgICAgICAgZm9ybWF0RGF0YToge3R5cGU6IEZ1bmN0aW9uLCBkZWZhdWx0OiBmdW5jdGlvbiAocmVzKSB7cmV0dXJuIHJlczt9fSxcbiAgICAgICAgLyoq5paH5Lu25qC85byPKi9cbiAgICAgICAgZm9ybWF0OiB7dHlwZTogQXJyYXksIHJlcXVpcmVkOiB0cnVlLH0sXG4gICAgICAgIC8qKuWPr+S4iuS8oOeahOacgOWkp+aWh+S7tuaVsCovXG4gICAgICAgIG1heENvdW50OiB7dHlwZTogTnVtYmVyLCBkZWZhdWx0OiA1fSxcbiAgICAgICAgLyoq5Y+v5LiK5Lyg55qE5paH5Lu25aSn5bCPKi9cbiAgICAgICAgbWF4U2l6ZToge3R5cGU6IE51bWJlciwgZGVmYXVsdDogMTAyNCAqIDJ9LFxuICAgIH0sXG4gICAgZGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGN1cnJlbnRJdGVtczogW10sXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIC8qKuWQjOatpeaooeWei+aVsOaNriovXG4gICAgICAgIHNldE1vZGVsVmFsdWUoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIFsuLi50aGlzLmN1cnJlbnRJdGVtcy5tYXAoZmlsZSA9PiAoe2lkOiBmaWxlLmlkLCB1cmw6IGZpbGUudXJsfSkpXSk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKuafpeeciyovXG4gICAgICAgIHZpZXcoaXRlbSkge1xuICAgICAgICAgICAgd2luZG93Lm9wZW4oaXRlbS51cmwsICd0YXJnZXQ9X2JsYW5rJylcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlU3VjY2VzcyhyZXMsIGZpbGUpIHtcbiAgICAgICAgICAgIGxldCBkYXRhID0gdGhpcy5mb3JtYXREYXRhKHJlcyk7XG4gICAgICAgICAgICBmaWxlLmlkID0gZGF0YS5pZDtcbiAgICAgICAgICAgIGZpbGUudXJsID0gZGF0YS51cmw7XG4gICAgICAgICAgICB0aGlzLnNldE1vZGVsVmFsdWUoKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlRm9ybWF0RXJyb3IoZmlsZSkge1xuICAgICAgICAgICAgdGhpcy4kTm90aWNlLndhcm5pbmcoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn5paH5Lu25qC85byP5LiN5q2j56GuJyxcbiAgICAgICAgICAgICAgICBkZXNjOiBg5paH5Lu2JyR7ZmlsZS5uYW1lfSfmoLzlvI/kuI3mraPnoa7vvIzor7fkuIrkvKBbJHt0aGlzLmZvcm1hdC5qb2luKCfjgIEnKX1d5qC85byP55qE5paH5Lu2YFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIGhhbmRsZU1heFNpemUoZmlsZSkge1xuICAgICAgICAgICAgdGhpcy4kTm90aWNlLndhcm5pbmcoe1xuICAgICAgICAgICAgICAgIHRpdGxlOiAn6LaF5Ye65paH5Lu25aSn5bCP6ZmQ5Yi2JyxcbiAgICAgICAgICAgICAgICBkZXNjOiBg5paH5Lu2JyR7ZmlsZS5uYW1lfSflpKrlpKfvvIzkuI3og73otoXov4cgJHt0aGlzLm1heFNpemUgLyAxMDI0fU1gXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlQmVmb3JlVXBsb2FkKCkge1xuICAgICAgICAgICAgY29uc3QgY2hlY2sgPSB0aGlzLmN1cnJlbnRJdGVtcy5sZW5ndGggPCB0aGlzLm1heENvdW50O1xuICAgICAgICAgICAgaWYgKCFjaGVjaykgdGhpcy4kTm90aWNlLndhcm5pbmcoe3RpdGxlOiBg5pyA5aSa5Y+q6IO95LiK5LygJHt0aGlzLm1heENvdW50feS4quaWh+S7tmB9KTtcbiAgICAgICAgICAgIHJldHVybiBjaGVjaztcbiAgICAgICAgfSxcbiAgICAgICAgaGFuZGxlUmVtb3ZlKGZpbGUpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEl0ZW1zLnNwbGljZSh0aGlzLmN1cnJlbnRJdGVtcy5pbmRleE9mKGZpbGUpLCAxKTtcbiAgICAgICAgICAgIHRoaXMuc2V0TW9kZWxWYWx1ZSgpO1xuICAgICAgICB9LFxuICAgIH0sXG4gICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgc2hvd1VwbG9hZGVyKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWF4Q291bnQgPiB0aGlzLmN1cnJlbnRJdGVtcy5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgfSxcbiAgICBtb3VudGVkKCkge1xuICAgICAgICB0aGlzLmN1cnJlbnRJdGVtcyA9IHRoaXMuJHJlZnMudXBsb2FkLmZpbGVMaXN0O1xuICAgIH0sXG4gICAgd2F0Y2g6IHtcbiAgICAgICAgaXRlbXMoKSB7XG4gICAgICAgICAgICAvL2l0ZW1zLT5kZWZhdWx0RmlsZUxpc3QtPmZpbGVMaXN0LT5jdXJyZW50SXRlbXNcbiAgICAgICAgICAgIHRoaXMuJG5leHRUaWNrKCgpID0+IHRoaXMuY3VycmVudEl0ZW1zID0gdGhpcy4kcmVmcy51cGxvYWQuZmlsZUxpc3QpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICAgIFVwbG9hZCxcbiAgICAgICAgRHJhZ2dhYmxlLFxuICAgICAgICBQcm9ncmVzcyxcbiAgICAgICAgSWNvblxuICAgIH0sXG59O1xuXG4iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfaXZpZXdfZGlzdF9pdmlld19fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV92dWVkcmFnZ2FibGVfXzsiXSwic291cmNlUm9vdCI6IiJ9