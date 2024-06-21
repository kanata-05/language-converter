/*If you use this code, with or without modifications, please credit the creator kanata-05
https://www.github.com/kanata-05/language-converter
This code is licensed under the CC-BY 3.0 License. */
document.getElementById('btnTranslate').addEventListener('click', function () {
    var sl = document.getElementById('slang').value;
    var tl = document.getElementById('tlang').value;
    var text = document.getElementById('txtSource').value;

    var url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sl}&tl=${tl}&dt=t&q=${encodeURIComponent(text)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            var translation = data[0][0][0];
            document.getElementById('txtTarget').value = translation;
        })
        .catch(error => console.error('Error:', error));

    // Function to save translation as text file
    document.getElementById('btnSaveText').addEventListener('click', function () {
        var translation = document.getElementById('txtTarget').value;
        var blob = new Blob([translation], { type: 'text/plain' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'translation.txt';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    });

    // Function to save translation as Word document
    document.getElementById('btnSaveDoc').addEventListener('click', function () {
        var textToWrite = document.getElementById('txtTarget').value;
        var blob = new Blob(['\ufeff', textToWrite], {
            type: 'application/msword'
        });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'translation.doc';
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    });

    // Function to print translation
    document.getElementById('btnPrint').addEventListener('click', function () {
        var printContents = document.getElementById('txtTarget').value;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    });

    // Function to update character and word counts
    function updateCharacterCount(sourceText, translatedText) {
        var sourceCharCount = sourceText.length;
        var sourceWordCount = sourceText.trim().split(/\s+/).length;
        var translationCharCount = translatedText.length;
        var translationWordCount = translatedText.trim().split(/\s+/).length;

        document.getElementById('charCount').textContent = `${sourceCharCount} (Source) / ${translationCharCount} (Translation)`;
        document.getElementById('wordCount').textContent = `${sourceWordCount} (Source) / ${translationWordCount} (Translation)`;
    }
});
