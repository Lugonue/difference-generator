install:
	npm ci | npm link
gen_diff:
	node bin/brain-games.js
publish:
	npm publish --dry-run
test:
	npx jest
test_coverage:
	npx jest --coverage 
fix_lint:
	npx eslint --no-eslintrc --config .eslintrc.json --fix .
lint:
	npx eslint --no-eslintrc --config .eslintrc.json .