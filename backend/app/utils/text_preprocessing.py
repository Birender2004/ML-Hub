import string
import nltk

from nltk.corpus import stopwords

from nltk.stem import PorterStemmer


def transform(text):
    text = text.lower()
    text = nltk.word_tokenize(text)

    y = []
    ps = PorterStemmer()

    for word in text:
        if word.isalnum():
            y.append(word)

    temp = y[:]
    y.clear()

    for word in temp:
        if word not in stopwords.words('english') and word not in string.punctuation:
            y.append(word)

    temp = y[:]
    y.clear()

    for word in temp:
        y.append(ps.stem(word))

    return " ".join(y)