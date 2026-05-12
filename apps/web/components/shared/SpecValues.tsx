import React from 'react'
import { useFieldArray } from 'react-hook-form';

const SpecValues = () => {
  const SpecItems = ({ groupIndex, control, register }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `specifications.${groupIndex}.specs` // Путь к вложенному массиву
  });

  return (
    <div className="ml-8 space-y-2">
      {fields.map((field, specIndex) => (
        <div key={field.id} className="flex gap-2 items-center">
          <input
            {...register(`specifications.${groupIndex}.specs.${specIndex}.name`)}
            placeholder="Название (н-р: Вес)"
            className="border p-1 text-sm flex-1"
          />
          <input
            {...register(`specifications.${groupIndex}.specs.${specIndex}.value`)}
            placeholder="Значение (н-р: 200г)"
            className="border p-1 text-sm flex-1"
          />
          <button 
            type="button" 
            onClick={() => remove(specIndex)}
            className="text-red-400 hover:text-red-600 px-2"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={() => append({ name: '', value: '' })}
        className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
      >
        + Добавить характеристику
      </button>
    </div>
  );
};
}

export default SpecValues