# Secure Email Setup Instructions

## Current Implementation

You now have a secure contact system with three options:

1. **Secure Contact Form** - Uses Formspree.io (already configured)
2. **Protected Email Display** - JavaScript-obfuscated email (needs your email)
3. **Professional Networks** - LinkedIn and GitHub links

## Steps to Add Your Email

### Step 1: Encode Your Email
Run this Python command to encode your email:

```bash
python3 -c "
email = 'your.real.email@domain.com'  # REPLACE WITH YOUR EMAIL
encoded = '.'.join(str(ord(char) + 100) for char in email)
print('Encoded email:', encoded)
print('\\nReplace line 70 in secure-contact-options.html with:')
print('var encodedEmail = \"' + encoded + '\";')
"
```

### Step 2: Update the HTML File
Edit `/home/owl/empty/academicpages.github.io-master/_includes/secure-contact-options.html`:

1. Find line ~70: `var encodedEmail = "112.113.114.115.116.64.117.118.119.120.121.46.122.123.124";`
2. Replace with your encoded email from Step 1

### Step 3: Test the Implementation
1. Open your website
2. Scroll to the Contact section
3. Verify the email decodes correctly
4. Test the copy button
5. Test the contact form link

## How It Protects Your Email

### Multiple Security Layers:
1. **JavaScript Obfuscation** - Email is encoded and only decodes in browser
2. **No Plain Text** - Email never appears in HTML source
3. **Bot Detection** - Most spam bots don't execute JavaScript
4. **Honeypot Fields** - In contact form to catch spam bots
5. **Formspree Protection** - Third-party service handles email delivery

### What Spam Bots See:
- Encoded string of numbers: `"112.113.114.115.116.64.117.118.119.120.121.46.122.123.124"`
- JavaScript decoding function
- No plain email address in HTML

## Alternative: Use Only Contact Form

If you prefer maximum security, you can:
1. Remove the "Protected Email" option
2. Keep only the contact form and professional network links
3. Edit `_pages/about.md` to remove the secure-contact-options include

## Testing Your Setup

After adding your email:
1. **View Source** - Check that email isn't in plain text
2. **Disable JavaScript** - Verify fallback message appears
3. **Test Contact Form** - Send a test message
4. **Check LinkedIn** - Ensure link works

## Maintenance

1. **Formspree Configuration** - Your form is configured to use Formspree
2. **Email Changes** - If you change email, re-encode and update
3. **Regular Testing** - Periodically test all contact methods

## Files Created/Modified

1. `_includes/secure-contact-options.html` - Main contact options component
2. `_pages/about.md` - Added contact section
3. `_includes/secure-email.html` - Simple email obfuscation (alternative)

## Next Steps

1. Add your encoded email (Step 1-2 above)
2. Sync changes: `./quick-sync.sh` (option 7)
3. Test on your live website
4. Consider setting up Formspree notifications

## Security Notes

- This provides good protection against basic spam bots
- Advanced bots with JavaScript engines might still harvest
- For maximum security, use only the contact form
- Regularly update your Formspree configuration if needed