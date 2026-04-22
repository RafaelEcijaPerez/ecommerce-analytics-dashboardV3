type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <input
      type="text"
      placeholder={placeholder || "Buscar..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        padding: "8px",
        margin: "10px 0",
        width: "250px",
      }}
    />
  );
}