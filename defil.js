const interval = 50;
const targetElements = Array.from(document.querySelectorAll("[data-defil]"));
const defilTrees = targetElements.map(element => traverseAndRemove(element));

const gen = makeDefil(defilTrees);
defilStep();

function defilStep() {
	const iteratorResult = gen.next();

	if (!iteratorResult.done) {
		setTimeout(defilStep, 5);
	}
}

function traverseAndRemove(element) {
	const node = {};
	node.nodeRef = element;

	if (element instanceof Text) {
		node.type = "text";
		node.remainingText = element.data.split("");
		element.data = "";
	} else if (element.childNodes) {
		node.type = "node";
		node.childNodes = [];

		for (let child of element.childNodes) {
			node.childNodes.push(traverseAndRemove(child));
		}
	}

	return node;
}

function* makeDefil(tree) {
	for (let root of tree) {
		yield* defilElement(root);
	}
}

function* defilElement(tree) {
	if (tree.type === "text") {
		let char;
		while (char = tree.remainingText.shift()) {
			tree.nodeRef.data += char;
			yield;
		}
	} else if (tree.type === "node") {
		for (let child of tree.childNodes) {
			yield* defilElement(child);
		}
	}
}

const exampleTree = {
	type: "node",
	nodeRef: null,
	childNodes: [
		{
			type: "text",
			nodeRef: null,
			remainingText: "Exemple de texte long. Avec des"
		},
		{
			type: "node",
			nodeRef: null,
			childNodes: []
		},
		{
			type: "text",
			nodeRef: null,
			remainingText: "retours à la ligne et des balises"
		},
		{
			type: "node",
			nodeRef: null,
			childNodes: [
				{
					type: "text",
					nodeRef: null,
					remainingText: "strong"
				}
			]
		},
		{
			type: "text",
			nodeRef: null,
			remainingText: "."
		}
	]
};
