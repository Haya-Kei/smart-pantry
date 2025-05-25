// components/FeedbackForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { Schema, FieldOption } from '@/types'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'

interface Props {
  schema: Schema
}

interface FormData {
  [key: string]: string | File | undefined;
}

export default function FeedbackForm({ schema }: Props) {
  const { register, handleSubmit } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    const form = new FormData()
    Object.entries(data).forEach(([k, v]) => {
      if (v !== undefined) {
        form.append(k, v as string | Blob)
      }
    })
    await fetch('/submit-feedback', {
      method: 'POST',
      body: form,
    })
    // 必要なら成功時の遷移やトースト
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {schema.fields.map((field) => (
        <div key={field.name} className={`col-span-1 md:col-span-${field.column_width}`}>
          <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
          </label>

          {field.type === 'string' && (
            <Input
              id={field.name}
              {...register(field.name, { required: field.required })}
            />
          )}

          {field.type === 'textarea' && (
            <Textarea
              id={field.name}
              rows={4}
              {...register(field.name, { required: field.required })}
            />
          )}

          {field.type === 'file' && (
            <Input
              id={field.name}
              type="file"
              {...register(field.name, { required: field.required })}
            />
          )}

          {field.type === 'reaction' && (
            <div className="flex space-x-3 mt-2">
              {field.options!.map((opt: FieldOption) => (
                <label key={opt.value} className="cursor-pointer">
                  <input
                    type="radio"
                    value={opt.value}
                    {...register(field.name, { required: true })}
                    className="sr-only peer"
                  />
                  <span
                    className="
                      text-2xl p-2 rounded border-2 border-transparent
                      transition-transform duration-100 peer-checked:border-blue-500 peer-checked:bg-blue-50
                      hover:scale-110
                    "
                  >
                    {opt.label}
                  </span>
                </label>
              ))}
            </div>
          )}

          {/* boolean や select など他のタイプがあれば同様に分岐 */}
        </div>
      ))}

      <div className="col-span-1 md:col-span-2">
        <Button type="submit" className="w-full">
          Submit Feedback
        </Button>
      </div>
    </form>
  )
}
