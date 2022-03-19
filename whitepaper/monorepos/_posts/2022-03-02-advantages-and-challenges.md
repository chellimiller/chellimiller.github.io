---
type: posts
title: "Monorepos: Advantages and Challenges"
date: 2022-03-02 18:35:54 -0700
---

# Monorepos: Advantages and Challenges

This article will discuss the advantages and challenges presented by the monorepo structure.

To keep the scope of this article reasonable,
this will not address the [merits of splitting reusable code into separate packages][reusability].
Many of the advantages below follow the assumption that the team understands
the business value of packaging reusable code separately.

Examples in this article will look at tooling for NodeJS monorepos, but the principles can apply to any monorepo.

## Advantages

### Single source of truth

Each repository requires overhead.
This overhead can include managing pipelines, repository settings,
build and test configurations, and more.

### Code reusability

In a monorepo structure, creating a separate package for reusable code is straightforward.
Reusable packages improve the speed of an organization over time and reduce work lost when project goals change.

_More information: [Importance of Packaging Reusable Code Separately][reusability]_

### Speed of refactors

Refactoring is an essential part of the early development stage of a project.
The ability to refactor code quickly enables developers to pivot
to meet the project's goals as they become more refined.

Monorepos allow related packages to be refactored together.

### Adaptability

We don't know what we don't know.

In early development, it is often difficult to precisely gauge a project's scope.
What begins as a modestly-scoped project can expand to a large-scale initiative.

We may believe we'll never need in-house utilities or tooling.
We may believe we'll never need a demo or documentation app.
We may believe we'll never need a helper package.
We may be wrong.
Realistically, we are probably wrong.

If a project is in a single repository,
code will be developed under the same package.
A large, single project is difficult to maintain or build upon.
New features will take longer as time goes on and the project will not be
able to quickly pivot to meet changing business and customer needs.

### Shared tooling

### Visibility

All code in a monorepo is there to be read and understood by the developers.
This visibility encourages developers to understand what another module is
doing rather than make assumptions.

### Improved testing

Writing E2E and integration testing is far easier when
the relevant packages live in the same repository.
Automated testing in general is often neglected,
but E2E and integration tests are neglected even more.

Functional testing is used because it's easier to do initially.
Yet it is unreliable because humans are error-prone.
It is expensive because developer time costs more than computer time.

Teams must set and enforce standards for testing.
However, standards that are burdens will eventually be discarded.
Teams must also aim to create the ideal environment for writing tests.
A good environment both reduces the cost of writing tests and
increases the quality of the tests that are written.

### Atomic changes

As new features are added in early development,
changes are often required in several packages.
When these packages belong in the same repository,
changes to a package can begin once the changes to the dependency are in review.
This ability can make the difference on allowing a new feature to be deployed on time.

## Challenges

### Tooling

Standard build, test, and lint scripts generally are not designed for monorepo development.
Fortunately, this problem is easily addressed with any of
the tools designed for monorepo development.

If a team hasn't worked with monorepos before,
they may initially struggle with learning to use the tools available.
Simple tools like Lerna are easy to get started with.
More robust tools like Nx.dev require more learning,
but provide more features that improve development speed.
Deciding what tooling to use for monorepo development is
something each team will need to decide for themselves.

### Loss of versioning

### Monoliths

Monorepo development in general should not be confused with
the unique challenges present for massive monorepos.
We will refer to these types of monorepos as monoliths.

Many of the issues below can be resolved with improved tooling.
All of these issues can be resolved with smaller, targeted monorepos.

There are some exceptionally structured and designed monoliths
that will not face these challenges.
These cases are rare and the issues below apply to the average monolith.

If developers are experiencing the issues below,
this is a good indicator that the monorepo has become a monolith.

_More information: See the **Recommendations** section below._

#### Performance

The worst struggle with monolith development is performance.

In the average monolith, everything is slow.
The IDE loads slowly and struggles to process the files.
The build and test times take several minutes
(or even an hour in extreme cases).
Git takes longer to load.
Pipelines take longer to fail or succeed.

As with any project,
poor performance can be related to tooling or configurations.
If a team is also facing some of the other monolith challenges,
it is generally a sign that the monorepo has grown too large.

#### Finding code

In a monolith, it can be frustrating to locate code.
If developers are finding they often get lost when looking for packages,
then this is a sign that the monorepo has grown too large.

#### Tight-coupling

In small monorepos, dependency management is a delight.
In a monolith, dependency management can be a constant struggle.
It can be difficult to understand the relationships between
packages as their number grows in size.
As the relationships between packages become harder to understand,
they can also become dependent upon one another in confusing ways.

#### Unrelated breaking changes

Every package in a monorepo is another package that can have a
random audit failure or other problem.
In small, focused monorepos,
problems with untouched packages is extremely rare.
When it does occur, it is generally a small burden that is quickly resolved.

In a monolith, untouched packages completely unrelated to the feature
can fail audits due to uncovered vulnerabilities.
Though it's important to address these issues,
it can be frustrating when it holds up development of unrelated packages.

## Recommendations

### Use monorepos in early development

Monorepos are ideal for early development.
They allow code to be broken into reusable packages while not
hindering the process of developing an MVP.
Atomic changes and improved refactoring make monorepos well-suited
for the earliest stages of development.

Early development is also the time when the downsides of a
challenges of a monorepo will not present themselves.
As the codebase matures,
the monorepo should be split into more focused monorepos.

### Split into focused monorepos as code matures

As code matures, the need for heavy refactors decreases.
This becomes the ideal time to split up a monorepo into several smaller monorepos.

For example, if a team was developing a React app and UI libraries alongside it,
they would benefit from having the UI libraries in the same repository
while they are developing the MVP.
Once the code becomes more stable,
the UI libraries can be separated out into a separate repository.

### Simplify versioning

Managing versions of different packages is time-consuming,
regardless if developing in a monorepo or not.
To reduce maintenance time, the simple approach is to have all packages
within a monorepo share the same version.

Initially, this may sound like a questionable idea.
What if one package is updated and another is not?

In early development, before the initial release,
versioning is generally not heavily monitored.
When the initial release occurs,
the version will generally be `1.0.0` for all packages.
This is generally a good time to review the monorepo and
determine if it should be split into more focused packages.

In targeted monorepos, sharing the same version is ideal for both
the library developer and developer consuming the library.
Monorepo projects like Nest, Nx.dev, Angular, and React
all publish packages under the same version.
With focused monorepos,
even mature projects benefit from publishing packages under the same version.

### Use appropriate tooling

If a team has no members familiar with monorepo development,
there are two approaches they should consider:
simple tooling or well-documented tooling.

Simple tools for monorepo development, such as Lerna,
are easy to learn and allow developers to get started quickly.
However, over time, developers may face limitations.

More robust tooling, such as Nx.dev,
will take more time to set up but can increase the
speed of development over time.

If a team chooses to use a more robust, opinionated monorepo tool,
they should ensure it is well-supported and well-documented.
Simple tooling that does not impact development should still be
well-supported and well-documented, but it is not as critical.

## Resources

- [Monolithic codebases vs monorepos](https://github.com/giltayar/bilt/blob/main/docs/monolithic-vs-monorepos.md)

[reusability]: ./reusability.md
