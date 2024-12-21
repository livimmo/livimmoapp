export const Footer = () => {
  return (
    <footer className="border-t py-6 mt-8">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Livimmo. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};