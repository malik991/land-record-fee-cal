type UrduProps = {
  children: React.ReactNode;
};

export default function Urdu({ children }: UrduProps) {
  return (
    <div className="bg-muted/70 border-r-4 border-pehla p-2 pr-6 rounded-md text-nafees text-xl font-semibold leading-relaxed mb-2">
      {children}
    </div>
  );
}
// This component is used to render Urdu text with specific styling.
// It applies a custom font and styles to the text, making it suitable for displaying Urdu content
