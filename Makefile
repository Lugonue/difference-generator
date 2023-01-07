install:
	npm ci
gen_diff:
	node bin/brain-games.js
publish:
	npm publish --dry-run
test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
	npx eslint --no-eslintrc --config .eslintrc.json .
	
test_fix:
	npx eslint --no-eslintrc --config .eslintrc.json --fix .