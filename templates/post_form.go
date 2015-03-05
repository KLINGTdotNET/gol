package templates

var postFormTemplate = `
{{ template "header" . }}

			<h1>{{ .title }}</h1>

			<form method="POST" action="/posts{{ if .post }}/{{ .post.Id }}{{ end }}">
				<div class="input-field">
					<input id="edit-title" class="markdown-input" name="title" autofocus required type="text" value="{{ .post.Title }}"></input>
					<label for="edit-title">Titlemania</label>
				</div>
				<div class="input-field">
					<textarea id="edit-content" class="materialize-textarea markdown-input" name="content" rows="80" cols="100">{{ .post.Content }}</textarea>
					<label for="edit-content">Your thoughts.</label>
				</div>


				<button class="btn waves-effect waves-light" type="submit" name="action">
					<i class="mdi-action-done left"></i>
					Submit
				</button>
				<a href="/" class="btn waves-effect waves-light red" type="submit" name="action">
					<i class="mdi-navigation-close left"></i>
					Cancel
				</a>
			</form>

{{template "footer" . }}`
