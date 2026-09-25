# Trainee Registration & Assessment Portal

A single-page HTML application for trainee registration, assessment management, and document generation. Built with vanilla JavaScript, no build tools required.

## Features

- **Multi-step Registration Form** - Complete trainee onboarding with 7 sections
- **Assessment Management** - Track trainee progress and performance
- **Dashboard Overview** - Statistics and quick actions
- **Document Generation** - Export to PDF and Word formats
- **Responsive Design** - Works on desktop and mobile devices
- **Bangla Support** - Bengali typography with proper fonts
- **No Backend Required** - Runs entirely in the browser

## How It Works

### PDF Generation (html2pdf.js)

The portal uses [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) library to convert HTML content to PDF:

1. **Capture Form Data**: Collects all form field values from the `formData` object
2. **Build HTML Template**: Generates a formatted HTML document with trainee information
3. **Apply Styling**: Uses inline CSS for layout, fonts, and print optimization
4. **Convert to PDF**: html2pdf.js renders the HTML as a high-quality PDF with:
   - A4 page size
   - Proper margins and spacing
   - Font embedding (Tiro Bangla for Bengali text)
   - Page break handling

**Key Parameters:**
```javascript
html2pdf().set({
  margin: 1,
  filename: 'Trainee_Form.pdf',
  image: { type: 'jpeg', quality: 0.98 },
  html2canvas: { scale: 2 },
  jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
}).from(element).save();
```

### DOCX Generation (Word HTML)

Word documents are generated using Microsoft Word's native HTML format:

1. **HTML Wrapper**: Creates a valid HTML document with Word namespace declarations
2. **CSS Injection**: Embeds styles for:
   - Page setup (`@page` rules)
   - Typography (Arial, Tiro Bangla for Bengali)
   - Table formatting
   - Print-specific styles
3. **Content Assembly**: Builds the document structure with:
   - Header with title
   - Formatted tables for data display
   - Section dividers
4. **File Export**: Saves as `.doc` file which Word can open directly

**Supported Formats:**
- `.doc` (Word 97-2003 format via HTML)
- Compatible with Microsoft Word, LibreOffice, Google Docs

## How to Use

### For Trainees (Registration)

1. Open the portal in your browser
2. Navigate through form sections using the tab navigation
3. Fill in required information:
   - Personal details (English & Bangla names)
   - Contact information
   - Educational background
   - Emergency contact
   - Skills & experience
   - References
4. Review all entered information
5. Click "Export as PDF" or "Export as Word" to download your form
6. Submit the downloaded document as required

### For Administrators (Assessment Management)

1. **Add Trainees**: Import trainee data or add manually
2. **Track Progress**: View assessment status for each trainee
3. **Manage Records**: Update trainee information as needed
4. **Generate Reports**: Export data for records or reporting

### For Developers (Self-Hosting)

1. Clone the repository:
   ```bash
   git clone https://github.com/minjarul1/trainee-form-portal.git
   ```

2. Deploy to any static hosting:
   - GitHub Pages
   - Netlify
   - Vercel
   - Any web server

3. Open `index.html` in a browser - no build step required

## File Structure

```
trainee-form-portal/
├── index.html          # Main application (single file)
└── README.md           # This documentation
```

## Technologies Used

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with CSS Variables
- **PDF Library**: html2pdf.js (Canvas + jsPDF)
- **Word Generation**: Native Word HTML format
- **Fonts**: Google Fonts (Inter, Tiro Bangla, Hind Siliguri)
- **Excel Export**: SheetJS (xlsx)

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Limitations

- No server-side processing (all data stays in browser)
- No database integration
- PDF generation requires internet connection (CDN libraries)
- Word documents are .doc format, not .docx

## Security Notes

- Form data is stored locally in browser memory only
- No data is transmitted to any server
- PDF/Word exports are generated client-side
- Sensitive information should be handled according to your organization's policies

## Customization

To customize the form fields or styling:

1. Edit the `formData` object in the JavaScript section
2. Modify CSS variables in the `:root` section
3. Update form labels and field definitions
4. Adjust PDF/Word templates for different output formats

## License

MIT License - Feel free to use, modify, and distribute for any purpose.

## Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Fork the repository and submit a pull request

---

**Built with ❤️ for efficient trainee management**
