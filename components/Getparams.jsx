import { FastAppHiddenForm, commonShortForm, invoiceShortForm, equipmentShortForm, equipmentLongForm } from './Variables';

export default function Getparams({hiddenfields}) {
  let result = {}
  let formFields = hiddenfields.form == 'fast-application' ? FastAppHiddenForm : (hiddenfields.form == 'common-short-form'? commonShortForm :((hiddenfields.form == 'invoice-short-form' || hiddenfields.form == 'invoice-fast-app') ? invoiceShortForm  : (hiddenfields.form == 'equipment-short-form'? equipmentShortForm : (hiddenfields.form == 'equipment-fast-app' ? equipmentLongForm : ''))))
  formFields.map((item) => {
    if(hiddenfields[item.name])
      result[item.id] = hiddenfields[item.name]
  });
  return result;
};