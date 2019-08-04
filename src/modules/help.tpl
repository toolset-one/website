<div class="help">
    <ul>
        @@for (var i = 0; i < questions.length; i++) {
            <li>
                <h4>
                    `+ questions[i].question +`
                </h4>
                <p>
                    `+ questions[i].answer +`
                </p>
            </li>
        }
    </ul>
</div>