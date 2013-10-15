immutable-collections
=====================

Persistent collections for Javascript
-------------------------------------

_immutable-collections_ is a library which provides immutable, persistent data structures for Javascript. Why is this important? Immutable data structures are the bread and butter of functional programming. Consider this quote from "Programming in Scala" (adapted for Javascript):

> Prefer [const], immutable objects, and [functions] without side effects. Reach for them first. Use [var], mutable objects, and [functions] with side effects when you have a specific need and justification for them.

Immutable values make it easier to develop correct software. They do away with race conditions and overreach. They make it possible to create functions without side effects. Functional programming is the future of Javascript. As web applications get larger and larger, the difficulty of scaling mutability is becoming more apparent and we need sharper tools for building big things. _immutable-collections_ is one more tool for your functional toolbox.