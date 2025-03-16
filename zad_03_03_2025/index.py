with open('sygnaly.txt', 'r', encoding='utf-8') as f:
    words = [line.strip() for line in f]

selected_4_1 = words[39::40]
message = ''.join([word[9] for word in selected_4_1])

max_unique = 0
best_word = ''
for word in words:
    current = len(set(word))
    if current > max_unique:
        max_unique = current
        best_word = word

valid_words = []
for word in words:
    ord_values = [ord(c) - ord('A') for c in word]
    min_ord = min(ord_values)
    max_ord = max(ord_values)
    if max_ord - min_ord <= 10:
        valid_words.append(word)

with open('wyniki4.txt', 'w', encoding='utf-8') as f:
    f.write("4.1\n")
    f.write(f"{message}\n\n")
    
    f.write("4.2\n")
    f.write(f"{best_word} {max_unique}\n\n")
    
    f.write("4.3\n")
    for word in valid_words:
        f.write(f"{word}\n")