'use client'

type InputProps = {
  name: string
  value: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  error?: string
  className?: string
  label?: string
}

export function Input({
  name,
  value,
  onChange,
  placeholder,
  error,
  className = '',
  label,
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <label className="text-gray-500 font-bold text-xs uppercase">
          {label}
        </label>
      )}
      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded-md focus:outline-none focus:ring-2 ${
          error ? 'focus:ring-red-500' : 'focus:ring-blue-500'
        }`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
