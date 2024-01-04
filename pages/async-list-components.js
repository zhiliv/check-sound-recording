/* Список компонентов для модальных форм */
export const listComponents = {
  'modal_name': markRaw(defineAsyncComponent(() => import(`./modals/modal_name.vue`))),
  'modal_confirm': markRaw(defineAsyncComponent(() => import(`./modals/modal-configrm.vue`))),
  'modal_name': markRaw(defineAsyncComponent(() => import(`./modals/modal_name.vue`))),
  'edit_types_record': markRaw(defineAsyncComponent(() => import(`./edit_types_record.vue`))),
  'analyzer_form': markRaw(defineAsyncComponent(() => import(`./analyzer_form.vue`))),
}