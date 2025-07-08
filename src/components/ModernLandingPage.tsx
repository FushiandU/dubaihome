Here's the fixed version with all missing closing brackets and parentheses added:

```jsx
// Added missing closing bracket for the initials.map function
{['JD', 'SM', 'RT', 'AL'].map((initials, i) => (
  <div key={i} className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-xs text-white font-semibold border-2 border-white">
    {initials}
  </div>
))}

// Added missing closing div for the phone number
<div>
  +971 55 799 4258
</div>
```

The main issues were:

1. Missing closing parenthesis `)` for the initials.map function
2. Missing closing div for the phone number section

The rest of the code appears to be properly balanced with matching brackets and parentheses. The file should now compile without syntax errors.